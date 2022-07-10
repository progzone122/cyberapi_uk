use cookie_store::CookieStore;
use once_cell::sync::OnceCell;
use serde::Serialize;
use std::{
    fs::File, fs::OpenOptions, io::BufReader, io::BufWriter, path::Path, sync::Mutex,
    sync::MutexGuard,
};
use url::Url;

use crate::error::CyberAPIError;
use crate::util::get_app_dir;

static COOKIE_STORE: OnceCell<Mutex<CookieStore>> = OnceCell::new();

fn init_store() -> &'static Mutex<CookieStore> {
    COOKIE_STORE.get_or_init(|| {
        let filename = Path::new(get_app_dir()).join(COOKIE_FILE);
        let file = OpenOptions::new()
            .create(true)
            .write(true)
            .read(true)
            .open(filename)
            .map(BufReader::new)
            .unwrap();
        let store = cookie_store::CookieStore::load_json(file).unwrap();
        Mutex::new(store)
    })
}

const COOKIE_FILE: &str = "cookies.json";

#[derive(Debug, Serialize)]
pub struct Cookie {
    name: String,
    value: String,
    path: String,
    domain: String,
    expires: String,
}

pub fn get_cookie_store() -> MutexGuard<'static, CookieStore> {
    let result = init_store();
    result.lock().unwrap()
}

pub fn save_cookie_store(set_cookies: Vec<String>, current_url: &Url) -> Result<(), CyberAPIError> {
    let filename = Path::new(get_app_dir()).join(COOKIE_FILE);
    let mut writer = File::create(filename).map(BufWriter::new)?;

    let mut store = get_cookie_store();
    for ele in set_cookies {
        store.parse(ele.as_str(), current_url)?;
    }

    store.save_json(&mut writer)?;

    Ok(())
}

pub fn list_cookie() -> Result<Vec<String>, CyberAPIError> {
    let store = get_cookie_store();
    let mut result: Vec<String> = Vec::new();

    for ele in store.iter_any() {
        let data = serde_json::to_string(ele)?;
        if !data.is_empty() {
            result.push(data);
        }
    }
    Ok(result)
}