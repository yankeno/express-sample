import { MutationTree, ActionTree } from 'vuex/types';
import { format, startOfMonth, subMonths } from 'date-fns';
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
  bar_graph_dates: [],
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
  set_bar_graph_dates: (state: DashboardState, dates: Array<string>) => {
    state.bar_graph_dates = dates;
  },
};

export const actions: ActionTree<DashboardState, DashboardState> = {
  async load_pie_chart({ commit }, term) {
    const from: string = term
      ? term.from
      : format(startOfMonth(new Date()), 'yyyy-MM-dd');
    const to: string = term ? term.to : format(new Date(), 'yyyy-MM-dd');
    const response = await this.$axios.$get(
      `/api/aggregate/category?id=1&from=${from}&to=${to}`
    );
    commit('set_pie_chart', response.data);
  },
  async load_bar_graph_date({ commit }, term) {
    const from: string = term
      ? term.from
      : format(startOfMonth(new Date()), 'yyyy-MM-dd');
    const to: string = term ? term.to : format(new Date(), 'yyyy-MM-dd');
    const response = await this.$axios.$get(
      `/api/aggregate/date?id=1&from=${from}&to=${to}`
    );
    commit('set_bar_graph_dates', [from, to]);
    commit('set_bar_graph_date', response.data);
  },
  async load_bar_graph_week({ commit }, term) {
    const from = term
      ? term.from
      : format(startOfMonth(subMonths(new Date(), 3)), 'yyyy-MM-dd'); // 3ヶ月前の月初
    const to: string = term ? term.to : format(new Date(), 'yyyy-MM-dd');
    const response = await this.$axios.$get(
      `/api/aggregate/week?id=1&from=${from}&to=${to}`
    );
    commit('set_bar_graph_dates', [from, to]);
    commit('set_bar_graph_week', response.data);
  },
  async load_bar_graph_month({ commit }, term) {
    const from = term
      ? term.from
      : format(startOfMonth(subMonths(new Date(), 6)), 'yyyy-MM-dd'); // 6ヶ月前の月初
    const to: string = term ? term.to : format(new Date(), 'yyyy-MM-dd');
    const response = await this.$axios.$get(
      `/api/aggregate/month?id=1&from=${from}&to=${to}`
    );
    commit('set_bar_graph_dates', [from, to]);
    commit('set_bar_graph_month', response.data);
  },
};
