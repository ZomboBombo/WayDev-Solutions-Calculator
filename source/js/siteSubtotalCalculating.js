'use strict';

/*
===============================================
--- МОДУЛЬ РАСЧЁТА ПРОМЕЖУТОЧНЫХ СТОИМОСТЕЙ ---
===============================================
*/
window.siteSubtotalCalculating = (function () {
  // ============================ КОНСТАНТЫ =============================
  const PLUS_SIGN = '+ ';
  const NUMBER_SYSTEM_BASE = 10;


  // =========================== DOM-элементы ===========================
  const calculatorForm = document.querySelector('.calculator-form'); // --- Форма расчёта стоимости сайта

  /*
  --- Словарь для групп полей калькулятора ---
  */
  const calculatorFieldset = {
    designTemplate: calculatorForm.querySelector('.calculator-form__fieldset--design-template'),        // --- группа "Шаблон дизайна"
    setup: calculatorForm.querySelector('.calculator-form__fieldset--setup-and-filling'),               // --- группа "Работы по настройке и наполнению"
    hostingAndDomain: calculatorForm.querySelector('.calculator-form__fieldset--hosting-and-domain'),   // --- группа "Хостинг и домен"
    integrations: calculatorForm.querySelector('.calculator-form__fieldset--integration'),              // --- группа "Интеграции"
    additionalServices: calculatorForm.querySelector('.calculator-form__fieldset--additional-services') // --- группа "Дополнительные услуги"
  };

  /*
  --- Словарь для кнопок выбора услуг ---
  */
  const calculatorButtonsList = {
    siteType: calculatorForm.querySelectorAll('input[name="site-type-radio"]'),                       // --- Радиокнопки выбора "Типа сайта",
    setup: calculatorForm.querySelectorAll('input[name="setup-and-filling-checkbox"]'),               // --- Чекбоксы выбора "Работ по настройке и наполнению",
    hostingAndDomain: calculatorForm.querySelectorAll('input[name="hosting-and-domain-checkbox"]'),   // --- Чекбоксы выбора "Хостинга и домена",
    integrations: calculatorForm.querySelectorAll('input[name="integrations-checkbox"]'),             // --- Чекбоксы выбора "Интеграций",
    additionalServices: calculatorForm.querySelectorAll('input[name="additional-services-checkbox"]') // --- Чекбоксы выбора "Дополнительных услуг"
  };

  // --- Коллекция списков радиокнопок для выбора "Шаблона дизайна" ---
  const designTemplateLists = calculatorForm.querySelectorAll('.design-template-list');

  /*
  --- Словарь для полей промежуточной стоимости каждой группы ---
  */
  const subtotal = {
    siteType: calculatorForm.querySelector('#subtotalSiteType'),                    // --- ...поле группы "Тип сайта"
    designTemplate: calculatorForm.querySelector('#subtotalDesignTemplate'),        // --- ...поле группы "Шаблон дизайна"
    setup: calculatorForm.querySelector('#subtotalSetup'),                          // --- ...поле группы "Работы по настройке и наполнению"
    hostingAndDomain: calculatorForm.querySelector('#subtotalHosting'),             // --- ...поле группы "Хостинг и домен"
    integrations: calculatorForm.querySelector('#subtotalIntegrations'),            // --- ...поле группы "Интеграция"
    additionalServices: calculatorForm.querySelector('#subtotalAdditionalServices') // --- ...поле группы "Дополнительные услуги"
  };


  /*
  -----------------------------------------------------------------------
  --------------------------- ОСНОВНАЯ ЛОГИКА ---------------------------
  -----------------------------------------------------------------------
  */
  // *** Словарь функций для вычисления промежуточной стоимости ***
  /*
  *** 1) ф-ция "onlyChoice" — вычисляет стоимость для групп с радиокнопками;
  *** 2) ф-ция "multipleChoice" — вычисляет стоимость для групп с чекбоксами.
  */ 
  const subtotalCalculating = {
    onlyChoice: function (elementsArray, subtotalField) {
      for (let i = 0; i < elementsArray.length; i++) {
        if (elementsArray[i].checked) {
          subtotalField.textContent = PLUS_SIGN + elementsArray[i].value;
        }
      }

      window.siteTotalCost.calculate();
    },
    multipleChoice: function (elementsArray, subtotalField) {
      let subtotalNumber = 0;
      for (let i = 0; i < elementsArray.length; i++) {
        if (elementsArray[i].checked) {
          subtotalNumber = subtotalNumber + parseInt(elementsArray[i].value, NUMBER_SYSTEM_BASE);
        }

        subtotalField.textContent = PLUS_SIGN + subtotalNumber;
      }

      window.siteTotalCost.calculate();
    }
  };

  // *** Функция для вычисления стоимости "Типа сайта" ***
  const siteTypeCostShow = function () {
    for (let i = 0; i < calculatorButtonsList.siteType.length; i++) {
      if (calculatorButtonsList.siteType[i].checked) {
        subtotal.siteType.textContent = calculatorButtonsList.siteType[i].value;
      }
    }

    window.siteTotalCost.calculate();
  };

  // *** Функция для вычисления промежуточной стоимости группы "Шаблон дизайна" ***
  const activateDesignTemplate = function () {
    for (let i = 0; i < designTemplateLists.length; i++) {
      if (designTemplateLists[i].style.display === 'block') {
        const designTemplateElements = designTemplateLists[i].querySelectorAll('input[type="radio"]');

        // --- Заполение поля числом, соответствующим значению отмеченного шаблона ---
        for (let j = 0; j < designTemplateElements.length; j++) {
          if (designTemplateElements[j].checked) {
            subtotal.designTemplate.textContent = PLUS_SIGN + designTemplateElements[j].value;
          }
        }

        window.siteTotalCost.calculate();


        // --- ДОБАВЛЕНИЕ обработчика события изменения состояния группы "Шаблон дизайна" ---
        calculatorFieldset.designTemplate.addEventListener('change', function () {
          subtotalCalculating.onlyChoice(designTemplateElements, subtotal.designTemplate);
        });
      }
    }
  };



  // --- ДОБАВЛЕНИЕ обработчиков событий ---
  calculatorFieldset.setup.addEventListener('change', function () {
    subtotalCalculating.multipleChoice(calculatorButtonsList.setup, subtotal.setup);
  });

  calculatorFieldset.hostingAndDomain.addEventListener('change', function () {
    subtotalCalculating.multipleChoice(calculatorButtonsList.hostingAndDomain, subtotal.hostingAndDomain);
  });

  calculatorFieldset.integrations.addEventListener('change', function () {
    subtotalCalculating.multipleChoice(calculatorButtonsList.integrations, subtotal.integrations);
  });

  calculatorFieldset.additionalServices.addEventListener('change', function () {
    subtotalCalculating.multipleChoice(calculatorButtonsList.additionalServices, subtotal.additionalServices);
  });


  // --- Вызовы функций (нужны для начального расчёта промежуточных стоимостей) ---
  subtotalCalculating.multipleChoice(calculatorButtonsList.setup, subtotal.setup);
  subtotalCalculating.multipleChoice(calculatorButtonsList.hostingAndDomain, subtotal.hostingAndDomain);
  subtotalCalculating.multipleChoice(calculatorButtonsList.integrations, subtotal.integrations);
  subtotalCalculating.multipleChoice(calculatorButtonsList.additionalServices, subtotal.additionalServices);


  /*
  *** Модуль возвращает ф-ции для:
  *** 1) отображения первоначальной стоимости за лицензию;
  *** 2) активации нужного шаблона дизайна (в зависимости от выбранного типа сайта).
  */
  return {
    showSiteTypeCost: siteTypeCostShow,
    activateDesignTemplate: activateDesignTemplate
  };
})();