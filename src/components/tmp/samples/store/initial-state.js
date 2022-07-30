export default  () => {
  return {
    title: "Тестовый компонент",
    event_ids: [1, 2, 3],
    alias: "samples",
    data: [],
    meta: {
      count: 0,
      limit: 0,
      offset: 0,
      page: 1,
      perPage: 0,
    },
    loading: true,
    filter: {
      where: {
        week: "",
        id: {
          operand: "like",
          pattern: "%T%",
          value: ""
        }
      },
      whereIn: {
      },
      seekString: ""
    },
    dictsRequired: [
      "departments",
      "users",
      "report_types",
    ],
    relationships: [
      "comments",
      "files",
      "history",
      "user",
    ],
  }
};