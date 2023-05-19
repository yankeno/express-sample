import { MutationTree } from 'vuex/types'
import format from 'date-fns/format'
import {
  CategoryResponse,
  DashboardState,
  TermResponse,
} from '~/types/dashboard'

export const state = (): DashboardState => ({
  pie_chart: {
    labels: [],
    series: [],
  },
  bar_graph: {
    labels: [],
    series: [],
  },
})

export const getters = {
  get_pie_chart_labels: (state: DashboardState): Object =>
    state.pie_chart.labels,
  get_pie_chart_series: (state: DashboardState): Object =>
    state.pie_chart.series,
  get_bar_graph_labels: (state: DashboardState): Object =>
    state.bar_graph.labels,
  get_bar_graph_series: (state: DashboardState): Object =>
    state.bar_graph.series,
}

export const mutations: MutationTree<DashboardState> = {
  set_pie_chart: (state: DashboardState, pieChart: CategoryResponse[]) => {
    const labels = pieChart.map((i) => i.parent_category_name)
    const series = pieChart.map((i) => Number(i.amount))
    state.pie_chart = {
      labels,
      series,
    }
  },
  set_bar_chart: (state: DashboardState, barChart: TermResponse[]) => {
    const labels = barChart.map((i) => format(new Date(i.date), 'YYYY/MM/dd'))
    const series = barChart.map((i) => Number(i.amount))
    state.bar_graph = {
      labels,
      series,
    }
  },
}

export const actions = {
  async load_pie_chart(state: any) {
    const respose = await $axios.$get('/category')
    state.commit('set_pie_chart', respose)
  },
}
