export type DashboardState = {
  pie_chart_date: {
    labels: Array<string>;
    series: Array<number>;
  };
  bar_graph_date: {
    labels: Array<string>;
    series: Array<number>;
  };
  pie_chart_week: {
    labels: Array<string>;
    series: Array<number>;
  };
  bar_graph_week: {
    labels: Array<string>;
    series: Array<number>;
  };
  pie_chart_month: {
    labels: Array<string>;
    series: Array<number>;
  };
  bar_graph_month: {
    labels: Array<string>;
    series: Array<number>;
  };
};

export type CategoryResponse = {
  parent_category_name: string;
  amount: string;
};

export type TermResponse = {
  date: string;
  amount: string;
};
