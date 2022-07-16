import {
  NButton,
  NCard,
  NDropdown,
  NEllipsis,
  NGi,
  NGrid,
  NH3,
  NIcon,
  NInput,
  NText,
  useDialog,
  useMessage,
} from "naive-ui";
import { defineComponent, onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import { css } from "@linaria/core";
import {
  CreateOutline,
  ListOutline,
  SearchOutline,
  SwapVerticalOutline,
  TrashOutline,
} from "@vicons/ionicons5";

import { i18nCommon, i18nDashboard } from "../i18n";
import { padding } from "../constants/style";
import ExDialog from "../components/ExDialog";
import { useAPICollectionsStore } from "../stores/api_collection";
import {
  APICollection,
  newDefaultAPICollection,
} from "../commands/api_collection";
import { formatSimpleDate, showError } from "../helpers/util";
import ExLoading from "../components/ExLoading";
import { ExFormItem } from "../components/ExForm";
import { goTo } from "../router";
import { names } from "../router/routes";
import { useHeaderStore } from "../stores/header";

const dashboardClass = css`
  padding: ${2 * padding}px;
`;
const collecitonDescriptionClass = css`
  height: 60px;
`;
const collectionContentClass = css`
  cursor: pointer;
`;

enum HandleKey {
  Modify = "modify",
  Delete = "delete",
}

enum SortType {
  LastModified = "lastModified",
  NameAsc = "nameAsc",
  NameDesc = "nameDesc",
  OldestFirst = "olderFirst",
  NewestFirst = "newestFirst",
}

const getFormItems = (): ExFormItem[] => {
  return [
    {
      key: "name",
      label: i18nCommon("name"),
      placeholer: i18nCommon("namePlaceholder"),
      rule: {
        required: true,
        message: i18nCommon("nameRequireError"),
        trigger: "blur",
      },
    },
    {
      key: "description",
      label: i18nCommon("description"),
      placeholer: i18nCommon("descriptionPlaceholder"),
      inputType: "textarea",
    },
  ];
};

// 过滤与排序
function filterAndSort(
  apiCollections: APICollection[],
  keyword: string,
  sortOrder: string
): APICollection[] {
  const collections = apiCollections.filter((item) => {
    if (!keyword) {
      return true;
    }
    return item.name.includes(keyword) || item.description.includes(keyword);
  });
  collections.sort((col1, col2) => {
    let value1 = "";
    let value2 = "";
    switch (sortOrder) {
      case SortType.NameAsc:
        value1 = col1.name;
        value2 = col2.name;
        break;
      case SortType.NameDesc:
        value2 = col1.name;
        value1 = col2.name;
        break;
      case SortType.OldestFirst:
        value1 = col1.createdAt;
        value2 = col2.createdAt;
        break;
      case SortType.NewestFirst:
        value2 = col1.createdAt;
        value1 = col2.createdAt;
        break;
      default:
        value2 = col1.updatedAt;
        value1 = col2.updatedAt;
        break;
    }

    if (value1 > value2) {
      return 1;
    }
    if (value1 < value2) {
      return -1;
    }
    return 0;
  });
  return collections;
}

export default defineComponent({
  name: "DashboardView",
  setup() {
    const message = useMessage();
    const dialog = useDialog();
    const store = useAPICollectionsStore();
    const { apiCollections, fetching } = storeToRefs(store);
    useHeaderStore().clear();

    const keyword = ref("");
    const sortOrder = ref(SortType.LastModified);

    const createCollection = () => {
      ExDialog({
        dialog,
        title: i18nDashboard("newCollection"),
        formItems: getFormItems(),
        onConfirm: async (data) => {
          try {
            const colleciton = newDefaultAPICollection();
            Object.assign(colleciton, data);
            await store.add(colleciton);
          } catch (err) {
            showError(message, err);
          }
        },
      });
    };

    onBeforeMount(async () => {
      try {
        await store.fetch();
      } catch (err) {
        showError(message, err);
      }
    });

    const handleCollection = (collection: APICollection, key: string) => {
      switch (key) {
        case HandleKey.Modify:
          {
            const formItems = getFormItems();
            formItems.forEach((item) => {
              const value = collection[item.key];
              if (value) {
                item.defaultValue = value as string;
              }
            });
            ExDialog({
              dialog,
              title: i18nDashboard("updateCollection"),
              formItems,
              onConfirm: async (data) => {
                try {
                  await store.update(Object.assign(collection, data));
                } catch (err) {
                  showError(message, err);
                }
              },
            });
          }
          break;
        case HandleKey.Delete:
          {
            const d = dialog.warning({
              title: i18nDashboard("deleteCollection"),
              content: i18nDashboard("deleteCollectionContent"),
              positiveText: i18nCommon("confirm"),
              onPositiveClick: async () => {
                d.loading = true;
                try {
                  await store.remove(collection.id);
                  message.success(i18nDashboard("deleteCollectionDone"));
                } catch (err) {
                  showError(message, err);
                } finally {
                  d.loading = false;
                }
              },
            });
          }
          break;
      }
    };

    return {
      sortOrder,
      keyword,
      createCollection,
      fetching,
      apiCollections,
      handleCollection,
      sortOptions: [
        {
          label: i18nDashboard("sortLastModified"),
          key: SortType.LastModified,
        },
        {
          label: i18nDashboard("sortNameAsc"),
          key: SortType.NameAsc,
        },
        {
          label: i18nDashboard("sortNameDesc"),
          key: SortType.NameDesc,
        },
        {
          label: i18nDashboard("sortOlderFirst"),
          key: SortType.OldestFirst,
        },
        {
          label: i18nDashboard("sortNewestFirst"),
          key: SortType.NewestFirst,
        },
      ],
    };
  },
  render() {
    const {
      sortOrder,
      sortOptions,
      createCollection,
      fetching,
      apiCollections,
      handleCollection,
      keyword,
    } = this;
    const slots = {
      suffix: () => (
        <NIcon>
          <SearchOutline />
        </NIcon>
      ),
    };

    const header = (
      <NGrid>
        <NGi span={8}>
          <NH3>{i18nCommon("dashboard")}</NH3>
        </NGi>
        <NGi span={16}>
          <NGrid xGap={10}>
            <NGi span={15}>
              <NInput
                clearable
                v-slots={slots}
                onUpdateValue={(value) => {
                  this.keyword = value;
                }}
                placeholder={i18nCommon("keywordFilterPlaceholder")}
              />
            </NGi>
            <NGi span={3}>
              <NDropdown
                class={"widthFull"}
                value={sortOrder}
                options={sortOptions}
                onSelect={(value) => {
                  this.sortOrder = value;
                }}
              >
                <NButton class={"widthFull"}>
                  <NIcon>
                    <SwapVerticalOutline />
                  </NIcon>
                </NButton>
              </NDropdown>
            </NGi>
            <NGi span={6}>
              <NButton
                class={"widthFull"}
                onClick={() => {
                  createCollection();
                }}
              >
                {i18nCommon("create")}
              </NButton>
            </NGi>
          </NGrid>
        </NGi>
      </NGrid>
    );

    let collecitons = <ExLoading />;
    if (!fetching) {
      const options = [
        {
          label: i18nCommon("modify"),
          key: HandleKey.Modify,
          icon: () => (
            <NIcon>
              <CreateOutline />
            </NIcon>
          ),
        },
        {
          label: i18nCommon("delete"),
          key: HandleKey.Delete,
          icon: () => (
            <NIcon>
              <TrashOutline />
            </NIcon>
          ),
        },
      ];
      const items = filterAndSort(apiCollections, keyword, sortOrder);
      const arr = items.map((item) => {
        const slots = {
          "header-extra": () => (
            <NDropdown
              options={options}
              trigger="click"
              onSelect={(key) => {
                handleCollection(item, key);
              }}
            >
              <NButton quaternary>
                <NIcon>
                  <ListOutline />
                </NIcon>
              </NButton>
            </NDropdown>
          ),
        };
        return (
          <NGi key={item.id}>
            <NCard title={item.name} v-slots={slots} hoverable>
              <div
                class={collectionContentClass}
                onClick={() => {
                  goTo(names.collection, {
                    query: {
                      id: item.id,
                    },
                  });
                }}
              >
                <div class={collecitonDescriptionClass}>
                  <NEllipsis lineClamp={3}>{item.description}</NEllipsis>
                </div>
                <div class="tar">
                  <NText>{formatSimpleDate(item.updatedAt)}</NText>
                </div>
              </div>
            </NCard>
          </NGi>
        );
      });
      collecitons = (
        <NGrid
          cols={"2 s:3 m:4 l:5 xl:6 2xl:7"}
          responsive={"screen"}
          xGap={20}
          yGap={20}
        >
          {arr}
        </NGrid>
      );
    }

    return (
      <div class={dashboardClass}>
        {header}
        <div>{collecitons}</div>
      </div>
    );
  },
});