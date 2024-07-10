$(document).ready(function () {
  //burder
  $(".burger").click(function () {
    $(".menu-wrap").addClass("menu-active");
    $("body").addClass("modal-open");
  });

  $(".header-close").click(function () {
    $(".menu-wrap").removeClass("menu-active");
    $("body").removeClass("modal-open");
  });

  //menu-mobile click on link
  if ($(window).width() <= 980) {
    $("header a:not(.dropdown-lang-btn)").click(function () {
      $(".menu-wrap").removeClass("menu-active");
      $("body").removeClass("modal-open");
    });
  }

  //header scroll
  !(function () {
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
      header.classList.toggle("header_active", window.pageYOffset >= 1);
    });
  })();

  // lang mobile dropdown
  if (document.querySelector(".dropdown-lang")) {
    const dropdownLang = document.querySelector(".dropdown-lang");
    const dropdownLangContent = document.querySelector(
      ".dropdown-lang-content"
    );
    dropdownLang.addEventListener("click", (e) => {
      e.preventDefault();
      dropdownLang.classList.toggle("open");
      dropdownLangContent.classList.toggle("show");
    });
  }

  // sort-btn
  if (document.querySelector(".sort-btn")) {
    const sortBtns = document.querySelectorAll(".sort-btn");

    sortBtns.forEach((sortBtn) => {
      sortBtn.addEventListener("click", (e) => {
        sortBtn.classList.toggle("checked");
      });
    });
  }

  //sort mobile
  if (document.querySelector(".sort-btn_mb")) {
    const sortBtn = document.querySelector(".sort-btn_mb");
    const sortElement = document.querySelector(".sort");
    const body = document.body;

    sortBtn.addEventListener("click", function () {
      sortElement.classList.toggle("visible");
      body.classList.toggle("modal-open");
      body.classList.toggle("overlay");
    });

    document.addEventListener("click", function (event) {
      if (
        !sortElement.contains(event.target) &&
        !sortBtn.contains(event.target)
      ) {
        sortElement.classList.remove("visible");
        body.classList.remove("modal-open");
        body.classList.remove("overlay");
      }
    });
  }

  //filter mobile
  if (document.querySelector(".filter-btn_mb")) {
    const filterBtn = document.querySelector(".filter-btn_mb");
    const filterWrap = document.querySelector(".filter-wrap");
    const cancelBtn = document.querySelector(".btn-cancel");

    filterBtn.addEventListener("click", function () {
      filterWrap.classList.toggle("visible");
    });
    cancelBtn.addEventListener("click", function () {
      filterWrap.classList.remove("visible");
    });
    document.addEventListener("click", function (event) {
      if (
        !filterBtn.contains(event.target) &&
        !filterWrap.contains(event.target)
      ) {
        filterWrap.classList.remove("visible");
      }
    });
  }

  //faq
  if (document.querySelector(".faq-item")) {
    const acc = document.getElementsByClassName("faq-item__title");

    for (let index = 0; index < acc.length; index++) {
      acc[index].addEventListener("click", function () {
        this.classList.toggle("active");
        this.parentNode.classList.toggle("active");
        var panel = this.parentNode.querySelector(".faq-item__content");
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  //textarea
  if (document.querySelector(".textarea")) {
    const textarea = document.querySelector("textarea");

    textarea.addEventListener("input", () => {
      textarea.style.height = textarea.scrollHeight + "px";
    });
  }

  //select
  $(".select").each(function () {
    const _this = $(this),
      selectOption = _this.find("option"),
      selectOptionLength = selectOption.length,
      selectedOption = selectOption.filter(":selected"),
      duration = 200;

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $("<div>", {
      class: "new-select",
      text: _this.children("option:disabled").text(),
    }).insertAfter(_this);

    const selectHead = _this.next(".new-select");
    $("<div>", {
      class: "new-select__list",
    }).insertAfter(selectHead);

    const selectList = selectHead.next(".new-select__list");
    for (let i = 1; i < selectOptionLength; i++) {
      $("<div>", {
        class: "new-select__item",
        html: $("<span>", {
          text: selectOption.eq(i).text(),
        }),
      })
        .attr("data-value", selectOption.eq(i).val())
        .appendTo(selectList);
    }

    const selectItem = selectList.find(".new-select__item");
    selectList.hide(); // instead of slideUp(0)
    selectHead.on("click", function () {
      if (!$(this).hasClass("on")) {
        $(this).addClass("on");
        selectList.show(); // instead of slideDown(duration)

        selectItem.on("click", function () {
          let chooseItem = $(this).data("value");

          $("select").val(chooseItem).attr("selected", "selected");
          selectHead.text($(this).find("span").text());

          selectList.hide(); // instead of slideUp(duration)
          selectHead.removeClass("on").addClass("new-select_checked");
        });
      } else {
        $(this).removeClass("on");
        selectList.hide(); // instead of slideUp(duration)
      }
    });
    // close dropdown (click outside)
    $(document).on("click", function (e) {
      if ($(e.target).closest(".select").length === 0) {
        selectList.hide();
        selectHead.removeClass("on");
      }
    });
  });

  //categories
  if (document.querySelector(".category")) {
    var categories = document.querySelectorAll(".category");
    for (var i = 0; i < categories.length; i++) {
      categories[i].addEventListener("click", function () {
        var siblings = this.parentNode.children;
        for (var j = 0; j < siblings.length; j++) {
          siblings[j].classList.remove("active");
        }
        this.classList.add("active");
      });
    }
  }

  //range
  if (document.querySelector("input[type=range]")) {
    function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
      const [from, to] = getParsed(fromInput, toInput);
      fillSlider(fromInput, toInput, "#DED5C9", "#E95639", controlSlider);
      if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
      } else {
        fromSlider.value = from;
      }
    }

    function controlToInput(toSlider, fromInput, toInput, controlSlider) {
      const [from, to] = getParsed(fromInput, toInput);
      fillSlider(fromInput, toInput, "#DED5C9", "#E95639", controlSlider);
      setToggleAccessible(toInput);
      if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
      } else {
        toInput.value = from;
      }
    }

    function controlFromSlider(fromSlider, toSlider, fromInput) {
      const [from, to] = getParsed(fromSlider, toSlider);
      fillSlider(fromSlider, toSlider, "#DED5C9", "#E95639", toSlider);
      if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
      } else {
        fromInput.value = from;
      }
    }

    function controlToSlider(fromSlider, toSlider, toInput) {
      const [from, to] = getParsed(fromSlider, toSlider);
      fillSlider(fromSlider, toSlider, "#DED5C9", "#E95639", toSlider);
      setToggleAccessible(toSlider);
      if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
      } else {
        toInput.value = from;
        toSlider.value = from;
      }
    }

    function getParsed(currentFrom, currentTo) {
      const from = parseInt(currentFrom.value, 10);
      const to = parseInt(currentTo.value, 10);
      return [from, to];
    }

    function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
      const rangeDistance = to.max - to.min;
      const fromPosition = from.value - to.min;
      const toPosition = to.value - to.min;
      controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
    }

    function setToggleAccessible(currentTarget) {
      const toSlider = document.querySelector("#toSlider");
      if (Number(currentTarget.value) <= 0) {
        toSlider.style.zIndex = 2;
      } else {
        toSlider.style.zIndex = 0;
      }
    }

    const fromSlider = document.querySelector("#fromSlider");
    const toSlider = document.querySelector("#toSlider");
    const fromInput = document.querySelector("#fromInput");
    const toInput = document.querySelector("#toInput");
    fillSlider(fromSlider, toSlider, "#DED5C9", "#E95639", toSlider);
    setToggleAccessible(toSlider);

    fromSlider.oninput = () =>
      controlFromSlider(fromSlider, toSlider, fromInput);
    toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
    fromInput.oninput = () =>
      controlFromInput(fromSlider, fromInput, toInput, toSlider);
    toInput.oninput = () =>
      controlToInput(toSlider, fromInput, toInput, toSlider);
  }

  //popup
  if (document.querySelector(".popup")) {
    const popups = document.querySelectorAll("[data-popup-id]");

    popups.forEach((popup) => {
      const popupId = popup.getAttribute("data-popup-id");
      const openPopupButton = document.querySelector(
        `[data-popup-open="${popupId}"]`
      );

      if (openPopupButton) {
        openPopupButton.addEventListener("click", () => {
          popup.classList.add("opened");
          document.body.classList.add("modal-open");
        });
      }
    });

    document.addEventListener("click", function (e) {
      let target = e.target;
      if (
        target.classList.contains("popup-close") ||
        target.classList.contains("popup__inner")
      ) {
        document.querySelectorAll(".popup").forEach((popup) => {
          popup.classList.remove("opened");
        });
        document.body.classList.remove("modal-open");
      }
    });
  }

  //video
  $(".video-wrap").click(function (e) {
    $(this).addClass("active");
    var $video = $(this).find("iframe"),
      src = $video.attr("src");
    $video.attr("src", src + "&autoplay=1");
    $(this).find("img").hide();
  });

  //swiper
  let toursSlider = new Swiper(".tours-swiper", {
    slidesPerView: 3,
    spaceBetween: 24,
    touchRatio: 0,
    watchOverflow: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "visibleSlide",
    navigation: {
      nextEl: ".swiper-btn-tours-next",
      prevEl: ".swiper-btn-tours-prev",
    },
    breakpoints: {
      900: {
        slidesPerView: 2,
        touchRatio: 1,
      },
      640: {
        slidesPerView: 1,
        touchRatio: 1,
      },
    },
  });

  // phone mask
  $('input[type="tel"]').mask("+375 (99) 999-99-99");

  //cookies
  $("body").ihavecookies({
    delay: 300,
    expires: 30,
    onAccept: function () {},
  });

  //calendar
  // /* Русификация datepicker */
  // $.datepicker.regional["ru"] = {
  //   closeText: "Закрыть",
  //   prevText: "Предыдущий",
  //   nextText: "Следующий",
  //   currentText: "Сегодня",
  //   monthNames: [
  //     "Январь",
  //     "Февраль",
  //     "Март",
  //     "Апрель",
  //     "Май",
  //     "Июнь",
  //     "Июль",
  //     "Август",
  //     "Сентябрь",
  //     "Октябрь",
  //     "Ноябрь",
  //     "Декабрь",
  //   ],
  //   monthNamesShort: [
  //     "Янв",
  //     "Фев",
  //     "Мар",
  //     "Апр",
  //     "Май",
  //     "Июн",
  //     "Июл",
  //     "Авг",
  //     "Сен",
  //     "Окт",
  //     "Ноя",
  //     "Дек",
  //   ],
  //   dayNames: [
  //     "воскресенье",
  //     "понедельник",
  //     "вторник",
  //     "среда",
  //     "четверг",
  //     "пятница",
  //     "суббота",
  //   ],
  //   dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
  //   dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  //   weekHeader: "Не",
  //   dateFormat: "dd.mm.yy",
  //   firstDay: 1,
  //   isRTL: false,
  //   showMonthAfterYear: false,
  //   yearSuffix: "",
  // };
  // $.datepicker.setDefaults($.datepicker.regional["ru"]);

  //calenadar with two inputs
  $(function () {
    $("#datepicker1").datepicker({
      minDate: 0,
      dateFormat: "dd.mm.yy",
      onSelect: function (dateText, inst) {
        let startDate = $(this).datepicker("getDate");
        $("#datepicker2").datepicker("option", "minDate", startDate);
        $(this).parent().addClass("selected");
      },
    });
    $("#datepicker2").datepicker({
      minDate: 0,
      dateFormat: "dd.mm.yy",
      onSelect: function (dateText, inst) {
        let endDate = $(this).datepicker("getDate");
        $("#datepicker1").datepicker("option", "maxDate", endDate);
        $(this).parent().addClass("selected");
      },
    });
  });

  //calenadar period
  $(function () {
    var firstDate = null;
    $("#date_range").datepicker({
      minDate: 0,
      dateFormat: "dd.mm.yy",
      range: true,
      onSelect: function (dateText, inst) {
        if (firstDate === null) {
          // first click
          firstDate = dateText;
          $(this).datepicker("option", "minDate", dateText);
          $(this).val(firstDate + " - ");
        } else {
          // second click
          var dates = dateText.split(" - ");
          var endDate = dates[0];
          var newDateText = firstDate + " - " + endDate;
          $(this).val(newDateText);
          $(this).parent().addClass("selected");
          firstDate = null;
          $("#date_range-res").val(newDateText);
          // console.log($('#date_range-res').val())
        }
      },
      beforeShowDay: function (date) {
        if (firstDate !== null) {
          var selectedDate = $.datepicker.parseDate("dd.mm.yy", firstDate);
          if (date.getTime() === selectedDate.getTime()) {
            return [true, "ui-datepicker-selected-first"];
          } else if (date.getTime() < selectedDate.getTime()) {
            return [false, ""];
          } else {
            return [true, ""];
          }
        } else {
          return [true, ""];
        }
      },
    });
  });
});
