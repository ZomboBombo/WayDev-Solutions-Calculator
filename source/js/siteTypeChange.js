'use strict';

/*
=======================================
--- МОДУЛЬ ЛОГИКИ ВЫБОРА ТИПА САЙТА ---
=======================================
*/
window.siteTypeChange = (function () {
  // ============================= КОНСТАНТЫ ============================
  const DISPLAY_NONE = 'display: none';
  const DISPLAY_BLOCK = 'display: block';
  const ID_ONLINE_STORE = 'typeOnlineStore';
  const ZERO = 0;
  const PLUS_SIGN = '+ ';
  const NUMBER_SYSTEM_BASE = 10;


  // =========================== DOM-элементы ===========================
  const calculatorForm = document.querySelector('.calculator-form'); // --- Форма расчёта стоимости сайта

  const siteTypeFieldset = calculatorForm.querySelector('#siteTypeFieldset'); // --- Группа полей "Тип сайта" (является ключевой, т.к. от выбора типа сайта зависит дальнейшее содержание Формы)
  const siteTypes = siteTypeFieldset.querySelectorAll('input[name="site-type-radio"]'); // --- Коллекция input'ов выбора типа сайта

  const designTemplateFieldset = calculatorForm.querySelector('.calculator-form__fieldset--design-template'); // --- Группа полей "Дизайн шаблона"
  const designTemplateLists = designTemplateFieldset.querySelectorAll('.design-template-list'); // --- Колллекция списков с шаблонами сайтов

  const integrationsFieldset = calculatorForm.querySelector('#integrationsFieldset'); // --- Группа полей "Интеграция"
  const integrationsButtons = integrationsFieldset.querySelectorAll('input[name="integrations-checkbox"]');
  const integrationsSubtotal = integrationsFieldset.querySelector('#subtotalIntegrations');


  /*
  -----------------------------------------------------------------------
  --------------------------- ОСНОВНАЯ ЛОГИКА ---------------------------
  -----------------------------------------------------------------------
  */
  // *** Функция для сокрытия списков шаблонов ***
  const hideTemplateLists = function () {
    designTemplateLists.forEach((templateList) => {
      templateList.style = DISPLAY_NONE;
    }); 
  };

  // *** Функция для переключения (скрытия/открытия) группы "Интеграции" ***
  const toggleIntegrationsFieldset = function (iterator) {
    /*
    *** Если текущий Тип сайта имеет ID, соответствующий типу "Интернет-магазин",
    *** то показывается группа "Интеграция".
    *
    *** Иначе — группа скрывается, а значение промежуточной стоимости
    *** для данной группы обнуляется.
    */ 
    if (siteTypes[iterator].id === ID_ONLINE_STORE) {
      integrationsFieldset.style = DISPLAY_BLOCK;

      /*
      *** Расчёт промежуточной стоимости для группы "Интеграция"
      */
      let subtotalIntegerForIntegrations = 0; // --- Начальное значение поля с промежуточным значением
      integrationsButtons.forEach((element) => {
        if (element.checked) {
          subtotalIntegerForIntegrations += parseInt(element.value, NUMBER_SYSTEM_BASE);
        }
      });

      // --- Запись в поле для промежуточной стоимости вычисленного значения ---
      integrationsSubtotal.textContent = PLUS_SIGN + subtotalIntegerForIntegrations;
    } else {
      integrationsFieldset.style = DISPLAY_NONE;
      integrationsSubtotal.textContent = ZERO;
    }
  };


  // *** Функция для обработчика события изменения Типа сайта ***
  const onSiteTypeChange = function () {
    /*
    *** Цикл проходится по всем элементам списка input'ов для выбора Типа сайта.
    ***
    *** Если текущий input имеет атрибут "checked",
    *** тогда из массива Шаблонов показывается список с номером,
    *** соответствующим номеру текущей итерации.
    */
    for (let i = 0; i < siteTypes.length; i++) {
      if (siteTypes[i].checked) {
        hideTemplateLists();
        designTemplateLists[i].style = DISPLAY_BLOCK;

        toggleIntegrationsFieldset(i);
      }
    }

    // *** Вызов функции для перерасчёта промежуточной стоимости выбранного "Типа сайта" ***
    window.siteSubtotalCalculating.showSiteTypeCost();
    window.siteSubtotalCalculating.activateDesignTemplate();
  };


  // *** ДОБАВЛЕНИЕ обработчиков события клика на радиокнопки выбора "Типа сайта" ***
  siteTypes.forEach((typeOfSite) => {
    typeOfSite.addEventListener('click', onSiteTypeChange);
  });


  // *** Вызов функции для обработки события клика по кнопкам "Тип сайта" ***
  /*
  *** Вызов данной ф-ции необходим для корректного отображения начального состояния калькулятора:
  *** 1) группа "Шаблон дизайна": отображается корректный список шаблонов в зависимости от выбранного типа сайта;
  *** 2) группа "Интеграция": отображается только в случае, если выбранный тип сайта — "Интернет-магазин".
  */
  onSiteTypeChange();
})();