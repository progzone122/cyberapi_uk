export default {
  collection: {
    filterPlaceholder: "filter keywords",
    newHTTPRequest: "Create a HTTP request",
    newFolder: "Create a folder",
    deleteSetting: "Delete configurations",
    deleteSettingContent: "Please confirm the deletion of configurations(%s)",
    modifySetting: "Modify configuration",
    copySetting: "Copy configuration",
    copySettingSuccess:
      "Configurations have been copied to clipboard successfully",
    shouldSelectAPISettingFirst: "Please select API request first",
    send: "Send",
    abort: "Abort",
    format: "Format",
    changeContentType: "Change data type",
    changeContentTypeContent:
      "The original data will be cleared after changing the data type, so please confirm the change",
    namePlaceholder: "name",
    valuePlaceholder: "value",
    requesting: "Requesting...",
    copyAsCURL: "Copy as curl",
    copyAsCURLSuccess: "CURL has been copied to the clipboard successfully",
    pinRequest: "Pin request",
    importSettings: "Import configurations",
    importSuccess: "Imported configurations successfully",
    exportSettings: "Export configurations",
    dragUploadTips: "Click or drag a file to this area to upload",
    exportSettingsSuccess:
      "The configurations are successfully exported to the download directory",
    curlTooLargeTips:
      "The curl data is too large, and the content has been copied to the clipboard",
    curlGenerateFail: "Generate curl fail",
    apiID: "Request ID",
    remoteAddr: "Remote Addr",
    dns: "DNS",
    tcp: "TCP",
    tls: "TLS",
    cipher: "Cipher Suite",
    serverProcessing: "Server Processing",
    contentTransfer: "Content Transfer",
  },
  common: {
    app: "CyberAPI",
    dashboard: "Dashboard",
    add: "Add",
    confirm: "Confirm",
    back: "Return",

    name: "Name",
    nameRequireError: "name can not be blank",
    namePlaceholder: "Please enter a name",

    description: "Description",
    descriptionPlaceholder: "Please enter description",

    modify: "Modify",

    loading: "Loading",
    delete: "Delete",
    duplicate: "Duplicate",
    settings: "Configurations",
    create: "Create",
    keywordFilterPlaceholder: "Please enter a keyword",
    saveToDownloadSuccess: "File is save to download successful",
  },
  dashboard: {
    newCollection: "Create API group",
    updateCollection: "Update API group",
    deleteCollection: "Delete API Group",
    deleteCollectionContent:
      "Please confirm the deletion of API group, which can not be recovered after deletion!",
    deleteCollectionDone: "The API group was successfully deleted",
    sortLastModified: "Modify Time",
    sortNameAsc: "Name Asc",
    sortNameDesc: "Name Desc",
    sortOlderFirst: "Older First",
    sortNewestFirst: "Newest First",
  },
  setting: {
    title: "Application Setting",
    themeTitle: "Please select the color theme of application",
    darkTheme: "Dark Theme",
    lightTheme: "Light Theme",
    systemTheme: "System Theme",
    infoTitle: "Application Information",
    appVersion: "Version",
    platform: "Platform",
    arch: "Architecture",
    os: "OS",
    userAgent: "User Agent",
    dir: "Directory",
    osVersion: "OS version",
    windowSize: "Application Window",
    windowWidth: "Width",
    windowResizeType: "Size type of application window",
    windowMaxSize: "Maximize",
    windowCustomSize: "Customize",
    windowWidthPlaceholder: "Please enter window width",
    windowHeight: "Height",
    windowHeightPlaceholder: "Please enter window height",
    cookieSetting: "Cookie",
    storeSetting: "Storage",
    appSetting: "Setting",
    envSetting: "ENV",
    reqHeaderSetting: "Req Header",
    exportTables: "Backup",
    exportTablesProcessing: "Backup is processing, please wait...",
    exportTablesSuccess: "Backup save in download folder: %s",
    importTables: "Restore",
    importTablesTips:
      "Restore will remove the original data. Are you sure to restore?",
    importTablesSuccess:
      "Restore success, and the application will restart in 3 seconds",
    customizeVariableSetting: "Variable",
    langChangeSuccess:
      "Language configuration is modified successfully, and the application will restart in 3 seconds",
    browser: "Browser",
    timeoutSetting: "Request Timeout",
    timeoutConnect: "Connect Timeout(s)",
    timeoutRead: "Read Timeout(s)",
    timeoutWrite: "Write Timeout(s)",
  },
  cookie: {
    title: "Cookie",
    name: "Name",
    namePlaceholder: "Please enter the name of cookie",
    value: "Value",
    valuePlaceholder: "Please enter the value of cookie",
    path: "Path",
    pathPlaceholder: "Please enter the path of cookie",
    domain: "Domain",
    domainPlaceholder: "Please enter the domain of cookie",
    expires: "Expiry Date",
    expiresPlaceholder: "Please enter the expiry date of cookie",
    op: "Operation",
    deleteCookie: "Delete cookie",
    deleteCookieContent: "Please confirm the deletion of cookie",
    neverExpired: "Never Expired",
    clearCookieTips: "Are you sure to clear all cookie?",
    clearCookie: "Clear Cookie",
  },
  environment: {
    title: "Environment",
    tips: "Use current environment to facilitate switching between different environments(only for current project)",
    uriIsNil: "request address can not be blank",
    addNew: "Add environmental variable",
    clearCurrent: "Clear current value",
  },
  customizeVariable: {
    title: "Customize Variable",
    tips: "Customize commonly used variables, get using value function(only for current project)",
  },
  globalReqHeader: {
    title: "HTTP Request Header",
    tips: "Customize http request header, they will be appended to request(only for current project)",
  },
  store: {
    title: "Storage",
    name: "Storage",
    desc: "Description",
    op: "Operation",
    settingStore: "Setting",
    settingStoreDesc:
      "Save configurations such as application window, theme and etc.",
    pinRequestsStore: "Pin",
    pinRequestsStoreDesc: "Save the relevant request information for topping",
    latestResponseStore: "LatestRequest",
    latestResponseStoreDesc: "Save the latest request response",
    clearTips:
      "Please confirm the clearing (%s) of all data, which can not be recovered after clearing",
    clearSuccess:
      "The stored data has been cleared, and the application will restart in 3 seconds",
    responseList: "Response List",
    noHistory: "There is no history response",
    clearHistory: "Clear History",
    clearHistorySuccess: "The history of request has been cleared",
  },
};
