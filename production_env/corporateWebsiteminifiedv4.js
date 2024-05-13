(() => {
  "use strict";
  function e() {}
  var t = window.location.origin,
    n = [
      {
        title: "For Issuers",
        subtitle: "Private Companies | Founders",
        link: "https://liquidity.qapitacorp.com/",
        iconSrc:
          "https://assets-global.website-files.com/633e5454c8dec0fa090556c5/63415a26407836e8ece22209_fundraising.svg",
        iconAlt: "Fundraising",
        iconClass: "menu-icon menu-cap",
      },
      {
        title: "For Investors",
        subtitle: "Institutions | Family Offices",
        link: "".concat(t, "/outreach/login"),
        iconSrc:
          "https://assets-global.website-files.com/633e5454c8dec0fa090556c5/634159b040783605e0e21b40_For-Investors.svg",
        iconAlt: "For Investors",
        iconClass: "menu-icon",
      },
      {
        title: "For Stakeholders",
        subtitle: "Shareholders | Employees",
        link: "https://liquidity.qapitacorp.com/",
        iconSrc:
          "https://assets-global.website-files.com/633e5454c8dec0fa090556c5/634159b9b9d4cee75c9faabd_For%20Stakeholders.svg",
        iconAlt: "For Stakeholders",
        iconClass: "menu-icon",
      },
    ];
  (e.prototype = {
    isUserLoggedIn: function e(t) {
      return t && t.userInfo && t.userInfo.isLoggedIn && !!t.userInfo.role;
    },
    _refreshHeader: function e(t) {
      var n;
      this._hideNavItemsOnStart(t),
        this.isUserLoggedIn(t)
          ? (this._showUserLoggedInNav(t),
            this._setRoleBasedNavItemVisibility(t),
            this._renderCogWheelMenu(t),
            this._refreshCogWheel(t))
          : this._showUserLoggedOutNav(t);
    },
    _showUserLoggedInNav: function e(t) {
      var n = document.querySelectorAll("#".concat(t.outreachNavItemsSelector)),
        o = document.querySelectorAll(
          '[class*="'.concat(t.corporateNavItemsSelector, '"]')
        );
      n.forEach(function (e) {
        return e.classList.remove("custom-hidden");
      }),
        this._removeMobileLoginNavItem(),
        this._removeLoginDemoNavItem(t),
        this._renderMobileCogwheelIcon(t),
        o.forEach(function (e) {
          return e.classList.add("custom-hidden");
        });
    },
    _showUserLoggedOutNav: function e(t) {
      t.userInfo;
      var o = document.querySelectorAll("#".concat(t.outreachNavItemsSelector)),
        a = document.querySelectorAll(
          '[class*="'.concat(t.corporateNavItemsSelector, '"]')
        );
      if (
        (o.forEach(function (e) {
          e.classList.add("custom-hidden");
        }),
        a.forEach(function (e) {
          return e.classList.remove("custom-hidden");
        }),
        this._renderMobileLoginNavItem(t, n),
        this._removeMobileCogwheelIcon(t),
        this._renderLoginDemoNavItem(t, n),
        window.location.pathname.includes("/outreach"))
      ) {
        var i = document.querySelector("#".concat(t.signupOrDemoSelector));
        (i.innerText = "Signup"), (i.href = "/outreach/investor/signup");
      } else {
        var r = document.querySelector("#".concat(t.signupOrDemoSelector));
        (r.innerText = "Book a Demo"), (r.href = "/book-a-demo");
      }
    },
    _setRoleBasedNavItemVisibility: function e(t) {
      if ("Investor" === t.userInfo.role || "Buyer" === t.userInfo.role) {
        var n = document.getElementsByClassName(t.DMLoggedSelector)[0];
        this._renderListings(t), n && n.classList.add("custom-hidden");
      } else if (
        "DealManager" === t.userInfo.role ||
        "Super Admin" === t.userInfo.role
      ) {
        var o = document.getElementsByClassName(t.investorLoggedSelector)[0];
        this._renderManage(t), o && o.classList.add("custom-hidden");
      }
    },
    _renderCogWheelMenu: function e(t) {
      var n, o;
      function a() {
        var e;
        if (
          !document.querySelector(
            ".right-view-mb .openmarketnav.openmarket-cogwheel"
          )
        ) {
          var t = document.createElement("div");
          t.className = "openmarketnav openmarket-cogwheel";
          var n = document.createElement("img");
          n.src =
            "https://assets-global.website-files.com/633e5454c8dec0fa090556c5/651d0a2aa7ba2062973396da_Settings_Icon.png";
          var o = document.createElement("a"),
            a;
          (o.className = "nav-link cogwheel-mb w-inline-block"),
            o.appendChild(n),
            t.appendChild(o),
            document.querySelector(".right-view-mb").appendChild(t);
        }
      }
      function i() {
        var e = document.querySelector(
          ".right-view-mb .openmarketnav.openmarket-cogwheel"
        );
        e && e.remove();
      }
      function r() {
        var e = document.getElementById("w-dropdown-list-a"),
          t = document.getElementById("w-dropdown-list-navdiv-a"),
          n = document.getElementById("w-dropdown-list-z1-a"),
          o,
          r = window.innerWidth <= 991;
        e &&
          (r
            ? e.classList.add("w--nav-dropdown-list-open")
            : e.classList.remove("w--nav-dropdown-list-open")),
          t &&
            (r
              ? t.classList.add("w--nav-dropdown-toggle-open")
              : t.classList.remove("w--nav-dropdown-toggle-open")),
          n &&
            (r
              ? n.classList.add("w--nav-dropdown-open")
              : n.classList.remove("w--nav-dropdown-open")),
          r ? a() : i();
      }
      r(), window.addEventListener("resize", r);
      var d = document.querySelector(".".concat(t.cogWheelSelector)),
        c = document.querySelector(
          ".right-view-mb .openmarketnav.openmarket-cogwheel"
        ),
        l = document.querySelector(
          ".".concat(t.outreachSubMenuDropdownSelector)
        );
      l && l.remove();
      var s = document.createElement("div");
      s.classList.add(t.outreachSubMenuDropdownSelector);
      var m = document.createElement("span");
      if (
        (m.classList.add("omp-user-name"),
        (m.textContent =
          (null === (n = t.userInfo) || void 0 === n
            ? void 0
            : n.name.firstName) +
          " " +
          (null === (o = t.userInfo) || void 0 === o
            ? void 0
            : o.name.lastName)),
        s.appendChild(m),
        "DealManager" === t.userInfo.role || "Super Admin" === t.userInfo.role)
      ) {
        var u = document.createElement("a");
        u.classList.add("omp-submenu-link"),
          (u.href = "".concat(window.location.origin, "/outreach/users")),
          (u.textContent = "User Details"),
          s.appendChild(u);
        var v = document.createElement("a");
        v.classList.add("omp-submenu-link"),
          (v.href = "".concat(window.location.origin, "/outreach/settings")),
          (v.textContent = "Settings"),
          s.appendChild(v);
      }
      var p = document.createElement("a");
      p.classList.add("omp-logout"),
        (p.href = "".concat(window.location.origin, "/outreach/logout")),
        p.classList.add("omp-submenu-link"),
        (p.textContent = "logout"),
        p.addEventListener("click", function () {
          localStorage.removeItem(t.localStorageUserInfo),
            window.dispatchEvent(
              new customEvent(t.userInfoChangedEventListner)
            );
        }),
        s.appendChild(p),
        d.appendChild(s),
        c && c.appendChild(s);
    },
    _refreshCogWheel: function e(t) {
      var n = this,
        o = document.querySelector(".".concat(t.cogWheelSelector)),
        a = document.querySelector(
          ".".concat(t.outreachSubMenuDropdownSelector)
        );
      a && a.remove(),
        o.addEventListener("click", function () {
          n._renderCogWheelMenu(t),
            document.addEventListener("click", function (e) {
              var n = document.querySelector(
                ".".concat(t.outreachSubMenuDropdownSelector)
              );
              n && !o.contains(e.target) && n.remove();
            });
        });
      var i = document.querySelector(
        ".right-view-mb .openmarketnav.openmarket-cogwheel"
      );
      i &&
        i.addEventListener("touchstart", function () {
          n._renderCogWheelMenu(t),
            document.addEventListener("touchend", function (e) {
              var n = document.querySelector(
                ".".concat(t.outreachSubMenuDropdownSelector)
              );
              n && !i.contains(e.target) && n.remove();
            });
        });
    },
    _hideNavItemsOnStart: function e(t) {
      var n;
      document
        .querySelectorAll("#".concat(t.outreachNavItemsSelector))
        .forEach(function (e) {
          e.classList.add("custom-hidden");
        });
    },
    _renderManage: function e(t) {
      var n = [
          {
            title: "Blocks",
            subtitle: "View Blocks",
            link: "/outreach/blocks",
            iconSrc:
              "https://assets-global.website-files.com/633e5454c8dec0fa090556c5/6548b3735fb5b25d5fc259ca_blocks.png",
            iconAlt: "Blocks",
            iconClass: "menu-icon menu-cap",
          },
          {
            title: "Investors",
            subtitle: "View Investor Master List",
            link: "/outreach/investors",
            iconSrc:
              "https://assets-global.website-files.com/633e5454c8dec0fa090556c5/6548b37c0bd21a7cd52e821a_investorMasterList.png",
            iconAlt: "Investors",
            iconClass: "menu-icon",
          },
        ],
        o = document.createElement("div");
      (o.id = "openmarketnav"), (o.className = "openmarketnav dmlogged");
      var a = document.createElement("div");
      a.className = "dropdown-container";
      var i = document.createElement("div");
      i.setAttribute("data-hover", "false"),
        i.setAttribute("data-delay", "0"),
        (i.id = "w-dropdown-list-z1-a"),
        (i.className = "z-1 w-dropdown");
      var r = document.createElement("div");
      (r.className = "nav-link w-dropdown-toggle"),
        (r.id = "w-dropdown-list-navdiv-a"),
        r.setAttribute("aria-controls", "w-dropdown-list-navdiv-a"),
        r.setAttribute("aria-haspopup", "menu"),
        r.setAttribute("aria-expanded", "false"),
        r.setAttribute("role", "button"),
        r.setAttribute("tabindex", "0");
      var d = document.createElement("div");
      (d.className = "w-icon-dropdown-toggle"),
        d.setAttribute("aria-hidden", "true");
      var c = document.createElement("div");
      (c.className = "nav-dropdown"),
        (c.textContent = "Manage"),
        r.appendChild(c),
        r.appendChild(d);
      var l = document.createElement("nav");
      (l.className = "menu-dropdown-list3 w-dropdown-list"),
        (l.id = "w-dropdown-list-a"),
        l.setAttribute("aria-labelledby", "w-dropdown-toggle-0");
      var s = document.createElement("div");
      (s.className = "w-layout-grid menu-dropdown-grid3"),
        n.forEach(function (e) {
          var t = document.createElement("div");
          t.className = "menu-dropdown-grid-item";
          var n = document.createElement("a");
          (n.href = e.link),
            (n.className = "menu-link w-inline-block"),
            n.setAttribute("tabindex", "0");
          var o = document.createElement("div");
          o.className = "menu-icon-block";
          var a = document.createElement("img");
          (a.src = e.iconSrc),
            (a.alt = e.iconAlt),
            (a.loading = "lazy"),
            (a.className = e.iconClass);
          var i = document.createElement("div");
          i.className = "menu-link-item";
          var r = document.createElement("div");
          (r.className = "menu-link-title"), (r.textContent = e.title);
          var d = document.createElement("div");
          (d.className = "menu-subtitle"),
            (d.textContent = e.subtitle),
            o.appendChild(a),
            i.appendChild(r),
            i.appendChild(d),
            n.appendChild(o),
            n.appendChild(i),
            t.appendChild(n),
            s.appendChild(t);
        }),
        l.appendChild(s),
        i.appendChild(r),
        i.appendChild(l),
        a.appendChild(i),
        o.appendChild(a);
      var m,
        u = l;
      function v() {
        u.classList.toggle("w--open");
        var e = u.classList.contains("w--open");
        r.setAttribute("aria-expanded", e ? "true" : "false");
      }
      r.addEventListener("click", v),
        document.body.addEventListener("click", function (e) {
          var t;
          !i.contains(e.target) &&
            u.classList.contains("w--open") &&
            (u.classList.remove("w--open"),
            r.setAttribute("aria-expanded", "false"));
        });
      var p = document.querySelector(".openmarketnav.dmlogged"),
        g;
      p && p.remove(),
        document.querySelector(".nav-menu.w-nav-menu").prepend(o);
    },
    _renderListings: function e() {
      var t = document.querySelector(".openmarketnav.investorlogged");
      t && t.remove();
      var n = document.createElement("div");
      (n.id = "openmarketnav"), (n.className = "openmarketnav investorlogged");
      var o = document.createElement("a"),
        a;
      (o.href = "/outreach/listings"),
        (o.className = "nav-link w-nav-link"),
        (o.textContent = "Listings"),
        n.appendChild(o),
        document.querySelector(".nav-menu.w-nav-menu").prepend(n);
    },
    _renderLoginDemoNavItem: function e(t, n) {
      var o = document.getElementById("corporatenav");
      o && o.remove();
      var a = document.createElement("div");
      (a.id = "corporatenav"), a.classList.add("corporatenav");
      var i = document.createElement("div");
      i.classList.add("login-dropdown", "at-hide");
      var r = document.createElement("div");
      r.classList.add("z-1", "w-dropdown");
      var d = document.createElement("div");
      d.classList.add("nav-link-login", "w-dropdown-toggle"),
        (d.id = "w-dropdown-toggle-4"),
        d.setAttribute("aria-controls", "w-dropdown-list-4"),
        d.setAttribute("aria-haspopup", "menu"),
        d.setAttribute("aria-expanded", "false"),
        d.setAttribute("role", "button"),
        d.setAttribute("tabindex", "0");
      var c = document.createElement("div");
      c.classList.add("icon-2", "w-icon-dropdown-toggle"),
        c.setAttribute("aria-hidden", "true");
      var l = document.createElement("div");
      l.classList.add("lofin-nav"),
        (l.textContent = "Login"),
        d.appendChild(c),
        d.appendChild(l),
        r.appendChild(d),
        i.appendChild(r),
        a.appendChild(i);
      var s = document.createElement("nav");
      s.classList.add("menu-dropdown-list3", "w-dropdown-list"),
        (s.id = "w-dropdown-list-4"),
        s.setAttribute("aria-labelledby", "w-dropdown-toggle-4");
      var m = document.createElement("div");
      m.classList.add("w-layout-grid", "menu-dropdown-grid3"),
        n.forEach(function (e) {
          var t = document.createElement("div");
          t.classList.add("menu-dropdown-grid-item"),
            (t.innerHTML = '\n        <a href="'
              .concat(
                e.link,
                '" class="menu-link w-inline-block" tabindex="0">\n            <div class="menu-icon-block">\n                <img src="'
              )
              .concat(e.iconSrc, '" loading="lazy" alt="')
              .concat(e.iconAlt, '" class="')
              .concat(
                e.iconClass,
                '">\n            </div>\n            <div class="menu-link-item">\n                <div class="menu-link-title">'
              )
              .concat(
                e.title,
                '</div>\n                <div class="menu-subtitle">'
              )
              .concat(
                e.subtitle,
                "</div>\n            </div>\n        </a>\n      "
              )),
            m.appendChild(t);
        }),
        s.appendChild(m),
        r.appendChild(s);
      var u = document.createElement("a"),
        v;
      (u.href = "/book-a-demo"),
        (u.id = "signup-demo"),
        u.classList.add(
          "button-fiiled",
          "margin-left-medium",
          "auto",
          "w-button"
        ),
        (u.textContent = "Book a Demo"),
        a.appendChild(u),
        document.querySelector(".nav-menu.w-nav-menu").appendChild(a),
        i.addEventListener("click", function () {
          var e = document.querySelector(".nav-link-login"),
            t,
            n,
            o = document
              .querySelector(".login-dropdown.at-hide")
              .querySelector(".z-1.w-dropdown")
              .querySelector(".menu-dropdown-list3.w-dropdown-list");
          e.classList.toggle("w--open"), o.classList.toggle("w--open");
          var a = e.classList.contains("w--open");
          e.setAttribute("aria-expanded", a.toString());
        });
    },
    _removeLoginDemoNavItem: function e() {
      var t = document.getElementById("corporatenav");
      t && t.remove();
    },
    _renderMobileCogwheelIcon: function e() {
      var t = document.querySelector(".nav-menu.w-nav-menu"),
        n = document.querySelector(".openmarketnav.openmarket-cogwheel");
      n && n.remove();
      var o = document.createElement("div");
      (o.id = "openmarketnav"),
        (o.className = "openmarketnav openmarket-cogwheel");
      var a = document.createElement("a");
      (a.href = "#"), (a.className = "nav-link cogwheel-mb w-inline-block");
      var i = document.createElement("img");
      (i.src =
        "https://assets-global.website-files.com/633e5454c8dec0fa090556c5/651d0a2aa7ba2062973396da_Settings_Icon.png"),
        (i.loading = "lazy"),
        (i.id = "settings"),
        (i.alt = ""),
        a.appendChild(i),
        o.appendChild(a),
        t.appendChild(o);
    },
    _removeMobileCogwheelIcon: function e() {
      var t = document.querySelector(".openmarketnav.openmarket-cogwheel");
      t && t.remove();
    },
    _renderMobileLoginNavItem: function e(t, n) {
      var o = document.querySelector(".right-view-mb"),
        a = document.querySelector(
          "login-dropdown.at-hide.hide-login.corporatenav"
        );
      if ((a && a.remove(), o)) {
        var i = document.createElement("div");
        i.classList.add(
          "login-dropdown",
          "at-hide",
          "hide-login",
          "corporatenav"
        );
        var r = document.createElement("div");
        r.classList.add("z-1", "w-dropdown");
        var d = document.createElement("div");
        d.classList.add("nav-link-login", "w-dropdown-toggle"),
          (d.id = "w-dropdown-toggle-4"),
          d.setAttribute("aria-controls", "w-dropdown-list-4"),
          d.setAttribute("aria-haspopup", "menu"),
          d.setAttribute("aria-expanded", "false"),
          d.setAttribute("role", "button"),
          d.setAttribute("tabindex", "0");
        var c = document.createElement("div");
        c.classList.add("icon-2", "w-icon-dropdown-toggle"),
          c.setAttribute("aria-hidden", "true");
        var l = document.createElement("div");
        l.classList.add("lofin-nav"),
          (l.textContent = "Login"),
          d.appendChild(c),
          d.appendChild(l),
          r.appendChild(d);
        var s = document.createElement("nav");
        s.classList.add("menu-dropdown-list3", "w-dropdown-list"),
          (s.id = "w-dropdown-list-4"),
          s.setAttribute("aria-labelledby", "w-dropdown-toggle-4");
        var m = document.createElement("div");
        m.classList.add("w-layout-grid", "menu-dropdown-grid3"),
          n.forEach(function (e) {
            var t = document.createElement("div");
            t.classList.add("menu-dropdown-grid-item"),
              (t.innerHTML = '\n        <a href="'
                .concat(
                  e.link,
                  '" class="menu-link w-inline-block" tabindex="0">\n            <div class="menu-icon-block">\n                <img src="'
                )
                .concat(e.iconSrc, '" loading="lazy" alt="')
                .concat(e.iconAlt, '" class="')
                .concat(
                  e.iconClass,
                  '">\n            </div>\n            <div class="menu-link-item">\n                <div class="menu-link-title">'
                )
                .concat(
                  e.title,
                  '</div>\n                <div class="menu-subtitle">'
                )
                .concat(
                  e.subtitle,
                  "</div>\n            </div>\n        </a>\n      "
                )),
              m.appendChild(t);
          }),
          s.appendChild(m),
          r.appendChild(s),
          i.appendChild(r),
          o.appendChild(i);
      }
    },
    _removeMobileLoginNavItem: function e() {
      var t = document.querySelector(
        "login-dropdown.at-hide.hide-login.corporatenav"
      );
      t && t.remove();
    },
  }),
    (window.corporateWebsiteHeader = e);
})();
