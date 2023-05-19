export type DashboardState = {
  pie_chart: {
    labels: Array<string>
    series: Array<number>
  }
  bar_graph: {
    labels: Array<string>
    series: Array<number>
  }
}

export type CategoryResponse = {
  parent_category_name: string
  amount: string
}

export type TermResponse = {
  date: string
  amount: string
}
