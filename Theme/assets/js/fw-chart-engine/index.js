import { ChartEngine } from './core/ChartEngine.js';

// Auto-Start wenn DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.FinanzwesirChartEngine = new ChartEngine();
    window.FinanzwesirChartEngine.init();
});