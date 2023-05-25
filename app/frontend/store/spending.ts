import { MutationTree, ActionTree } from 'vuex/types';
import format from 'date-fns/format';
import {
  CategoryResponse,
  DashboardState,
  TermResponse,
} from '~/types/dashboard';

// 本来コンポーネントでデータ取得をすべきだが Vuex 練習用として store で取得
export const state = (): DashboardState => ({
  pie_chart_date: {
    labels: [],
    series: [],
  },
  bar_graph_date: {
    labels: [],
    series: [],
  },
  pie_chart_week: {
    labels: [],
    series: [],
  },
  bar_graph_week: {
    labels: [],
    series: [],
  },
  pie_chart_month: {
    labels: [],
    series: [],
  },
  bar_graph_month: {
    labels: [],
    series: [],
  },
});

export const getters = {
  get_pie_chart_date_labels: (state: DashboardState): Object =>
    state.pie_chart_date.labels,
  get_pie_chart_date_series: (state: DashboardState): Object =>
    state.pie_chart_date.series,
  get_bar_graph_date_labels: (state: DashboardState): Object =>
    state.bar_graph_date.labels,
  get_bar_graph_date_series: (state: DashboardState): Object =>
    state.bar_graph_date.series,
  get_pie_chart_week_labels: (state: DashboardState): Object =>
    state.bar_graph_week.labels,
};

export const mutations: MutationTree<DashboardState> = {
  set_pie_chart_date: (state: DashboardState, pieChart: CategoryResponse[]) => {
    const labels = pieChart.map((i) => i.parent_category_name);
    const series = pieChart.map((i) => Number(i.amount));
    state.pie_chart_date = {
      labels,
      series,
    };
  },
  set_bar_chart_date: (state: DashboardState, barChart: TermResponse[]) => {
    const labels = barChart.map((i) => format(new Date(i.date), 'yyyy/MM/dd'));
    const series = barChart.map((i) => Number(i.amount));
    state.bar_graph_date = {
      labels,
      series,
    };
  },
  set_pie_chart_week: (state: DashboardState, pieChart: CategoryResponse[]) => {
    const labels = pieChart.map((i) => i.parent_category_name);
    const series = pieChart.map((i) => Number(i.amount));
    state.pie_chart_week = {
      labels,
      series,
    };
  },
  set_bar_chart_week: (state: DashboardState, barChart: TermResponse[]) => {
    const labels = barChart.map((i) => format(new Date(i.date), 'yyyy/MM/dd'));
    const series = barChart.map((i) => Number(i.amount));
    state.bar_graph_week = {
      labels,
      series,
    };
  },
  set_pie_chart_month: (
    state: DashboardState,
    pieChart: CategoryResponse[]
  ) => {
    const labels = pieChart.map((i) => i.parent_category_name);
    const series = pieChart.map((i) => Number(i.amount));
    state.pie_chart_month = {
      labels,
      series,
    };
  },
  set_bar_chart_month: (state: DashboardState, barChart: TermResponse[]) => {
    const labels = barChart.map((i) => format(new Date(i.date), 'yyyy/MM/dd'));
    const series = barChart.map((i) => Number(i.amount));
    state.bar_graph_month = {
      labels,
      series,
    };
  },
};

export const actions: ActionTree<DashboardState, DashboardState> = {
  async load_pie_chart_date({ commit }) {
    const respose = await this.$axios.$get('/api/aggregate/category?id=1');
    commit('set_pie_chart_date', respose.data);
  },
  async load_bar_graph_date({ commit }) {
    const response = await this.$axios.$get(
      '/api/aggregate/date?id=1&from=2023-05-01'
    );
    commit('set_bar_chart_date', response.data);
  },
  async load_pie_chart_week({ commit }) {
    const respose = await this.$axios.$get('/api/aggregate/category?id=1');
    commit('set_pie_chart_week', respose.data);
  },
  async load_bar_graph_week({ commit }) {
    const response = await this.$axios.$get(
      '/api/aggregate/week?id=1&from=2023-05-01'
    );
    commit('set_bar_chart', response.data);
  },
  async load_pie_chart_month({ commit }) {
    const respose = await this.$axios.$get('/api/aggregate/category?id=1');
    commit('set_pie_chart_month', respose.data);
  },
  async load_bar_graph_month({ commit }) {
    const response = await this.$axios.$get(
      '/api/aggregate/month?id=1&from=2023-05-01'
    );
    commit('set_bar_chart', response.data);
  },
};
