import { MutationTree, ActionTree } from 'vuex/types';
import format from 'date-fns/format';
import {
  CategoryResponse,
  DashboardState,
  TermResponse,
} from '~/types/dashboard';

// 本来コンポーネントでデータ取得をすべきだが Vuex 練習用として store で取得
export const state = (): DashboardState => ({
  pie_chart: {
    labels: [],
    series: [],
  },
  bar_graph_date: {
    labels: [],
    series: [],
  },
  bar_graph_week: {
    labels: [],
    series: [],
  },
  bar_graph_month: {
    labels: [],
    series: [],
  },
});

export const getters = {
  get_pie_chart_labels: (state: DashboardState): Object =>
    state.pie_chart.labels,
  get_pie_chart_series: (state: DashboardState): Object =>
    state.pie_chart.series,
  get_bar_graph_date_labels: (state: DashboardState): Object =>
    state.bar_graph_date.labels,
  get_bar_graph_date_series: (state: DashboardState): Object =>
    state.bar_graph_date.series,
  get_bar_graph_week_labels: (state: DashboardState): Object =>
    state.bar_graph_week.labels,
  get_bar_graph_week_series: (state: DashboardState): Object =>
    state.bar_graph_week.series,
  get_bar_graph_month_labels: (state: DashboardState): Object =>
    state.bar_graph_month.labels,
  get_bar_graph_month_series: (state: DashboardState): Object =>
    state.bar_graph_month.series,
};

export const mutations: MutationTree<DashboardState> = {
  set_pie_chart: (state: DashboardState, pieChart: CategoryResponse[]) => {
    const labels = pieChart.map((i) => i.parent_category_name);
    const series = pieChart.map((i) => Number(i.amount));
    state.pie_chart = {
      labels,
      series,
    };
  },
  set_bar_graph_date: (state: DashboardState, barChart: TermResponse[]) => {
    const labels = barChart.map((i) => format(new Date(i.date), 'yyyy/MM/dd'));
    const series = barChart.map((i) => Number(i.amount));
    state.bar_graph_date = {
      labels,
      series,
    };
  },
  set_bar_graph_week: (state: DashboardState, barChart: TermResponse[]) => {
    const labels = barChart.map((i) => format(new Date(i.date), 'yyyy/MM/dd'));
    const series = barChart.map((i) => Number(i.amount));
    state.bar_graph_week = {
      labels,
      series,
    };
  },
  set_bar_graph_month: (state: DashboardState, barChart: TermResponse[]) => {
    const labels = barChart.map((i) => format(new Date(i.date), 'yyyy/MM/dd'));
    const series = barChart.map((i) => Number(i.amount));
    state.bar_graph_month = {
      labels,
      series,
    };
  },
};

export const actions: ActionTree<DashboardState, DashboardState> = {
  async load_pie_chart({ commit }) {
    const respose = await this.$axios.$get('/api/aggregate/category?id=1');
    commit('set_pie_chart', respose.data);
  },
  async load_bar_graph_date({ commit }) {
    const response = await this.$axios.$get(
      '/api/aggregate/date?id=1&from=2023-05-01'
    );
    commit('set_bar_graph_date', response.data);
  },
  async load_bar_graph_week({ commit }) {
    const response = await this.$axios.$get(
      '/api/aggregate/week?id=1&from=2023-05-01'
    );
    commit('set_bar_graph_week', response.data);
  },
  async load_bar_graph_month({ commit }) {
    const response = await this.$axios.$get(
      '/api/aggregate/month?id=1&from=2023-05-01'
    );
    console.log(response);
    commit('set_bar_graph_month', response.data);
  },
};
