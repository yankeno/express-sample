export type BarGrapSeries = {
  name: string;
  data: Array<number>;
};

export type DashboardState = {
  pie_chart: {
    labels: Array<string>;
    series: Array<number>;
  };
  bar_graph_date: {
    labels: Array<string>;
    series: Array<BarGrapSeries>;
  };
  bar_graph_week: {
    labels: Array<string>;
    series: Array<BarGrapSeries>;
  };
  bar_graph_month: {
    labels: Array<string>;
    series: Array<BarGrapSeries>;
  };
  bar_graph_term: string;
  bar_graph_series: Array<BarGrapSeries>;
  bar_graph_options: any;
};

export type CategoryResponse = {
  parent_category_name: string;
  amount: string;
};

type Spending = {
  date: string;
  amount: string;
};

export type TermResponse = {
  spendings: Array<Spending>;
  budgets: Array<number>;
};
