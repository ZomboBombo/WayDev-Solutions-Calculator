'use strict';

/*
======================================
--- МОДУЛЬ РАСЧЁТА СТОИМОСТИ САЙТА ---
======================================
*/
window.siteTotalCost = (function () {
  // ============================ КОНСТАНТЫ =============================
  const REG_EXP_FOR_INTEGER_SUBTOTAL = /\d+/;
  const NUMBER_SYSTEM_BASE = 10;


  // =========================== DOM-элементы ===========================
  const subtotalFields = document.querySelectorAll('.calculator-form__subtotal-cost');
  const totalCostField = document.querySelector('#totalSiteCost');


  /*
  -----------------------------------------------------------------------
  --------------------------- ОСНОВНАЯ ЛОГИКА ---------------------------
  -----------------------------------------------------------------------
  */
  // *** Функция для вычисления ИТОГОВОЙ стоимости сайта ***
  const totalSiteCostCalculate = function () {
    let totalSiteCost = 0;

    /*
    *** Цикл проходит по всем полям с промежуточными стоимостями,
    *** приводит строковое значение к целочисленному и прибавляет
    *** его к значению для Итоговой стоимости сайта.
    */
    subtotalFields.forEach((element) => {
      totalSiteCost += parseInt(element.textContent.match(REG_EXP_FOR_INTEGER_SUBTOTAL), NUMBER_SYSTEM_BASE);
    });

    totalCostField.textContent = totalSiteCost;
  };


  /*
  *** Модуль возвращает ф-цию для перерасчёта значения ИТОГОВОЙ стоимости сайта
  */
  return {
    calculate: totalSiteCostCalculate
  };
})();