export default class ColumnChart {
  element = null;

  constructor(props = {}) {
    const { data = [], label = '', link = '', value = 0, formatHeading = (data) => data } = props;
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.formatHeading = formatHeading;
    this.chartHeight = 50;

    this.render();
  }


  getTemplate() {
    const body = this.getChartBody();
    const head = this.formatHeading(this.value);

    return `
        <div class="column-chart__title">
          Total ${this.label}
          <a class="column-chart__link" href="${this.link}">View all</a>
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${head}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${body}
          </div>
        </div>
      `;
  }

  getChartBody() {
    let body;
    const columnsProps = this.getColumnProps(this.data);

    if (this.data.length) {
      body = `${columnsProps.map(({percent, value}) => `<div style="--value: ${value}" data-tooltip="${percent}"></div>`).join('')}`;
    } else {
      body = this.getSkeletonBody();
    }

    return body;
  }

  getSkeletonBody() {
    return `
      <svg width="299" height="109" viewBox="0 0 299 109" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="147" height="24" fill="#F5F6F8"/>
          <rect y="59" width="9" height="50" fill="#ECEEF3"/>
          <rect x="10" y="74" width="9" height="35" fill="#ECEEF3"/>
          <rect x="20" y="87" width="9" height="22" fill="#ECEEF3"/>
          <rect x="30" y="70" width="9" height="39" fill="#ECEEF3"/>
          <rect x="40" y="87" width="9" height="22" fill="#ECEEF3"/>
          <rect x="50" y="79" width="9" height="30" fill="#ECEEF3"/>
          <rect x="60" y="70" width="9" height="39" fill="#ECEEF3"/>
          <rect x="70" y="59" width="9" height="50" fill="#ECEEF3"/>
          <rect x="90" y="87" width="9" height="22" fill="#ECEEF3"/>
          <rect x="100" y="79" width="9" height="30" fill="#ECEEF3"/>
          <rect x="110" y="74" width="9" height="35" fill="#ECEEF3"/>
          <rect x="120" y="98" width="9" height="11" fill="#ECEEF3"/>
          <rect x="130" y="59" width="9" height="50" fill="#ECEEF3"/>
          <rect x="140" y="98" width="9" height="11" fill="#ECEEF3"/>
          <rect x="150" y="70" width="9" height="39" fill="#ECEEF3"/>
          <rect x="160" y="79" width="9" height="30" fill="#ECEEF3"/>
          <rect x="170" y="87" width="9" height="22" fill="#ECEEF3"/>
          <rect x="180" y="74" width="9" height="35" fill="#ECEEF3"/>
          <rect x="190" y="79" width="9" height="30" fill="#ECEEF3"/>
          <rect x="200" y="98" width="9" height="11" fill="#ECEEF3"/>
          <rect x="210" y="70" width="9" height="39" fill="#ECEEF3"/>
          <rect x="220" y="74" width="9" height="35" fill="#ECEEF3"/>
          <rect x="230" y="64" width="9" height="45" fill="#ECEEF3"/>
          <rect x="240" y="79" width="9" height="30" fill="#ECEEF3"/>
          <rect x="250" y="98" width="9" height="11" fill="#ECEEF3"/>
          <rect x="260" y="79" width="9" height="30" fill="#ECEEF3"/>
          <rect x="270" y="98" width="9" height="11" fill="#ECEEF3"/>
          <rect x="280" y="74" width="9" height="35" fill="#ECEEF3"/>
          <rect x="290" y="92" width="9" height="17" fill="#ECEEF3"/>
          <rect x="80" y="98" width="9" height="11" fill="#ECEEF3"/>
      </svg>
      `;
  }

  update(data = []) {
    this.data = data;
    this.render();
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('style', `--chart-height: ${this.chartHeight}`);
    const chartClass = this.data.length ? 'column-chart' : 'column-chart column-chart_loading';
    wrapper.setAttribute('class', chartClass);
    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper;
  }
}
