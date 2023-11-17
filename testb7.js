function corporateWebsiteHeader() {}
const menuItems = [
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
    link: "https://open-marketplace.qapitacorp.com/",
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

corporateWebsiteHeader.prototype = {
  isUserLoggedIn: function (context) {
    return (
      context &&
      context.userInfo &&
      context.userInfo.isLoggedIn &&
      !!context.userInfo.role
    );
  },

  _refreshHeader: function (context) {
    this._hideNavItemsOnStart(context);
    var isLoggedIn = this.isUserLoggedIn(context);
    if (!isLoggedIn) {
      this._showUserLoggedOutNav(context);
      return;
    }
    this._showUserLoggedInNav(context);
    this._setRoleBasedNavItemVisibility(context);
    this._renderCogWheelMenu(context);
    this._refreshCogWheel(context);
  },

  _showUserLoggedInNav: function (context) {
    var openMarketNav = document.querySelectorAll(
      `#${context.outreachNavItemsSelector}`
    );
    var corporateNav = document.querySelectorAll(
      `[class*="${context.corporateNavItemsSelector}"]`
    );

    openMarketNav.forEach((nodeList) =>
      nodeList.classList.remove("custom-hidden")
    );
    this._removeMobileLoginNavItem();
    this._removeLoginDemoNavItem(context);
    this._renderMobileCogwheelIcon(context);

    // hides corporate navItem ex: login / Book a Demo
    corporateNav.forEach((nodeList) => nodeList.classList.add("custom-hidden"));
  },

  _showUserLoggedOutNav: function (context) {
    if (context.userInfo) {
    }
    var openMarketNav = document.querySelectorAll(
      `#${context.outreachNavItemsSelector}`
    );
    var corporateNav = document.querySelectorAll(
      `[class*="${context.corporateNavItemsSelector}"]`
    );

    // hide outreachNavItem ex: listings / manage / cogWheel
    openMarketNav.forEach((nodeList) => {
      nodeList.classList.add("custom-hidden");
    });
    corporateNav.forEach((nodeList) =>
      nodeList.classList.remove("custom-hidden")
    );
    this._renderMobileLoginNavItem(context, menuItems);
    this._removeMobileCogwheelIcon(context);
    this._renderLoginDemoNavItem(context, menuItems);

    // set the signup and login on window path outreach
    if (window.location.pathname.includes("/outreach")) {
      const signupOrDemo = document.querySelector(
        `#${context.signupOrDemoSelector}`
      );
      signupOrDemo.innerText = "Signup";
      signupOrDemo.href = "/outreach/investor/signup";
    } else {
      const signupOrDemo = document.querySelector(
        `#${context.signupOrDemoSelector}`
      );
      signupOrDemo.innerText = "Book a Demo";
      signupOrDemo.href = "/book-a-demo";
    }
  },

  _setRoleBasedNavItemVisibility: function (context) {
    if (
      context.userInfo.role === "Investor" ||
      context.userInfo.role === "Buyer"
    ) {
      const dmLogged = document.getElementsByClassName(
        context.DMLoggedSelector
      )[0];
      this._renderListings(context);
      if (dmLogged) dmLogged.classList.add("custom-hidden");
    } else if (
      context.userInfo.role === "DealManager" ||
      context.userInfo.role === "Super Admin"
    ) {
      const investorLogged = document.getElementsByClassName(
        context.investorLoggedSelector
      )[0];

      this._renderManage(context);
      if (investorLogged) investorLogged.classList.add("custom-hidden");
    }
  },
  _renderCogWheelMenu: function (context) {
    function createCogWheelIcon() {
      const rightViewMB = document.querySelector(
        ".right-view-mb .openmarketnav.openmarket-cogwheel"
      );
      console.log(rightViewMB, "rightviewmb ");
      if (!rightViewMB) {
        // Creates CogWheel Icon
        const cogWheelIconElement = document.createElement("div");
        cogWheelIconElement.className = "openmarketnav openmarket-cogwheel";
        const icon = document.createElement("img");
        icon.src =
          "https://assets-global.website-files.com/633e5454c8dec0fa090556c5/651d0a2aa7ba2062973396da_Settings_Icon.png";
        const iconLink = document.createElement("a");
        iconLink.className = "nav-link cogwheel-mb w-inline-block";
        iconLink.appendChild(icon);
        cogWheelIconElement.appendChild(iconLink);

        const navBarItemsList = document.querySelector(".right-view-mb");
        navBarItemsList.appendChild(cogWheelIconElement);
      }
    }

    function removeCogWheelIcon() {
      const rightCogWheel = document.querySelector(
        ".right-view-mb .openmarketnav.openmarket-cogwheel"
      );
      if (rightCogWheel) {
        rightCogWheel.remove();
      }
    }

    function handleMediaQuery() {
      const manageDropList = document.getElementById("w-dropdown-list-a");
      const manageNavDiv = document.getElementById("w-dropdown-list-navdiv-a");
      const manageZ1Div = document.getElementById("w-dropdown-list-z1-a");

      const windowWidth = window.innerWidth;

      if (windowWidth <= 991) {
        if (manageDropList)
          manageDropList.classList.add("w--nav-dropdown-list-open");
        if (manageNavDiv)
          manageNavDiv.classList.add("w--nav-dropdown-toggle-open");
        if (manageZ1Div) manageZ1Div.classList.add("w--nav-dropdown-open");

        console.log("media query hits the create cog wheel");
        createCogWheelIcon();
      } else if (windowWidth >= 991) {
        if (manageDropList)
          manageDropList.classList.remove("w--nav-dropdown-list-open");
        if (manageNavDiv)
          manageNavDiv.classList.remove("w--nav-dropdown-toggle-open");
        if (manageZ1Div) manageZ1Div.classList.remove("w--nav-dropdown-open");

        removeCogWheelIcon();
      }
    }

    handleMediaQuery();

    window.addEventListener("resize", handleMediaQuery);

    // render the dropdown menu
    const cogWheel = document.querySelector(`.${context.cogWheelSelector}`);

    const cogWheelMB = document.querySelector(
      ".right-view-mb .openmarketnav.openmarket-cogwheel"
    );
    const existingSubmenu = document.querySelector(
      `.${context.outreachSubMenuDropdownSelector}`
    );
    if (existingSubmenu) {
      existingSubmenu.remove();
    }

    const outreachDropdownDiv = document.createElement("div");
    outreachDropdownDiv.classList.add(context.outreachSubMenuDropdownSelector);

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("omp-user-name");
    nameSpan.textContent =
      context.userInfo?.name.firstName + " " + context.userInfo?.name.lastName;
    outreachDropdownDiv.appendChild(nameSpan);

    if (
      context.userInfo.role === "DealManager" ||
      context.userInfo.role === "Super Admin"
    ) {
      // Conditionally show contents of CogWheel dropdown

      const userDetailsLink = document.createElement("a");
      userDetailsLink.classList.add("omp-submenu-link");
      userDetailsLink.href = `${window.location.origin}/outreach/users`;
      userDetailsLink.textContent = "User Details";
      outreachDropdownDiv.appendChild(userDetailsLink);

      const settingsLink = document.createElement("a");
      settingsLink.classList.add("omp-submenu-link");
      settingsLink.href = `${window.location.origin}/outreach/settings`;
      settingsLink.textContent = "Settings";
      outreachDropdownDiv.appendChild(settingsLink);
    }

    const logoutSpan = document.createElement("a");
    logoutSpan.classList.add("omp-logout");
    logoutSpan.href = `${window.location.origin}/outreach/logout`;
    logoutSpan.classList.add("omp-submenu-link");
    logoutSpan.textContent = "logout";
    logoutSpan.addEventListener("click", () => {
      localStorage.removeItem(context.localStorageUserInfo);
      window.dispatchEvent(
        new customEvent(context.userInfoChangedEventListner)
      );
    });

    outreachDropdownDiv.appendChild(logoutSpan);

    cogWheel.appendChild(outreachDropdownDiv);
    if (cogWheelMB) {
      cogWheelMB.appendChild(outreachDropdownDiv);
    }
  },

  _refreshCogWheel: function (context) {
    const cogWheel = document.querySelector(`.${context.cogWheelSelector}`);

    const existingSubmenu = document.querySelector(
      `.${context.outreachSubMenuDropdownSelector}`
    );
    if (existingSubmenu) {
      existingSubmenu.remove();
    }
    cogWheel.addEventListener("click", () => {
      // show the cogwheel dropdown menu(omp-submenu-dropdown)

      this._renderCogWheelMenu(context);

      // listener to remove the cogwheel dropdown list
      document.addEventListener("click", (event) => {
        const subNavMenu = document.querySelector(
          `.${context.outreachSubMenuDropdownSelector}`
        );
        if (subNavMenu && !cogWheel.contains(event.target)) {
          subNavMenu.remove();
        }
      });
    });

    /* ------- mobile responsive event Listener ------ */
    const cogWheelMB = document.querySelector(
      ".right-view-mb .openmarketnav.openmarket-cogwheel"
    );

    if (cogWheelMB) {
      cogWheelMB.addEventListener("touchstart", () => {
        this._renderCogWheelMenu(context);

        // listener to remove the cogwheel dropdown list
        document.addEventListener("touchend", (event) => {
          const subNavMenu = document.querySelector(
            `.${context.outreachSubMenuDropdownSelector}`
          );
          if (subNavMenu && !cogWheelMB.contains(event.target)) {
            subNavMenu.remove();
          }
        });
      });
    }
    /* --- mobile responsive event listener --- */
  },
  _hideNavItemsOnStart: function (context) {
    var openMarketNav = document.querySelectorAll(
      `#${context.outreachNavItemsSelector}`
    );

    openMarketNav.forEach((nodeList) => {
      nodeList.classList.add("custom-hidden");
    });
  },
  _renderManage: function (context) {
    const menuItemsData = [
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
    ];

    // Create the main elements
    const openmarketnav = document.createElement("div");
    openmarketnav.id = "openmarketnav";
    openmarketnav.className = "openmarketnav dmlogged";

    const dropdownContainer = document.createElement("div");
    dropdownContainer.className = "dropdown-container";

    const wDropdown = document.createElement("div");
    wDropdown.setAttribute("data-hover", "false");
    wDropdown.setAttribute("data-delay", "0");
    wDropdown.id = "w-dropdown-list-z1-a";
    wDropdown.className = "z-1 w-dropdown";

    const navLink = document.createElement("div");
    navLink.className = "nav-link w-dropdown-toggle";
    navLink.id = "w-dropdown-list-navdiv-a";
    navLink.setAttribute("aria-controls", "w-dropdown-list-navdiv-a");
    navLink.setAttribute("aria-haspopup", "menu");
    navLink.setAttribute("aria-expanded", "false");
    navLink.setAttribute("role", "button");
    navLink.setAttribute("tabindex", "0");

    const wIconDropdownToggle = document.createElement("div");
    wIconDropdownToggle.className = "w-icon-dropdown-toggle";
    wIconDropdownToggle.setAttribute("aria-hidden", "true");

    const navDropdown = document.createElement("div");
    navDropdown.className = "nav-dropdown";
    navDropdown.textContent = "Manage";

    navLink.appendChild(navDropdown);
    navLink.appendChild(wIconDropdownToggle);

    const menuDropdownList3 = document.createElement("nav");
    menuDropdownList3.className = "menu-dropdown-list3 w-dropdown-list";
    menuDropdownList3.id = "w-dropdown-list-a";
    menuDropdownList3.setAttribute("aria-labelledby", "w-dropdown-toggle-0");

    const layoutGrid = document.createElement("div");
    layoutGrid.className = "w-layout-grid menu-dropdown-grid3";

    // Loop through menuItemsData to create menu items
    menuItemsData.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.className = "menu-dropdown-grid-item";

      const linkElement = document.createElement("a");
      linkElement.href = item.link;
      linkElement.className = "menu-link w-inline-block";
      linkElement.setAttribute("tabindex", "0");

      const iconBlock = document.createElement("div");
      iconBlock.className = "menu-icon-block";

      const iconElement = document.createElement("img");
      iconElement.src = item.iconSrc;
      iconElement.alt = item.iconAlt;
      iconElement.loading = "lazy";
      iconElement.className = item.iconClass;

      const linkItem = document.createElement("div");
      linkItem.className = "menu-link-item";

      const linkTitle = document.createElement("div");
      linkTitle.className = "menu-link-title";
      linkTitle.textContent = item.title;

      const subtitle = document.createElement("div");
      subtitle.className = "menu-subtitle";
      subtitle.textContent = item.subtitle;

      iconBlock.appendChild(iconElement);
      linkItem.appendChild(linkTitle);
      linkItem.appendChild(subtitle);
      linkElement.appendChild(iconBlock);
      linkElement.appendChild(linkItem);
      menuItem.appendChild(linkElement);

      layoutGrid.appendChild(menuItem);
    });

    menuDropdownList3.appendChild(layoutGrid);
    wDropdown.appendChild(navLink);
    wDropdown.appendChild(menuDropdownList3);
    dropdownContainer.appendChild(wDropdown);
    openmarketnav.appendChild(dropdownContainer);

    const toggleElement = navLink;
    const listElement = menuDropdownList3;

    function toggleMenu() {
      listElement.classList.toggle("w--open");
      const isMenuOpen = listElement.classList.contains("w--open");
      navLink.setAttribute("aria-expanded", isMenuOpen ? "true" : "false");
    }

    toggleElement.addEventListener("click", toggleMenu);
    document.body.addEventListener("click", function (event) {
      const isClickInside = wDropdown.contains(event.target);
      if (!isClickInside && listElement.classList.contains("w--open")) {
        listElement.classList.remove("w--open");
        navLink.setAttribute("aria-expanded", "false");
      }
    });
    // Remove existing "Manage" dropdown, if it exists
    const existingManageNav = document.querySelector(".openmarketnav.dmlogged");
    if (existingManageNav) {
      existingManageNav.remove();
    }
    const webflowNavItemsList = document.querySelector(".nav-menu.w-nav-menu");
    webflowNavItemsList.prepend(openmarketnav);
  },

  _renderListings: function () {
    const existingElements = document.querySelector(
      ".openmarketnav.investorlogged"
    );
    if (existingElements) {
      existingElements.remove();
    }

    const openmarketnav = document.createElement("div");
    openmarketnav.id = "openmarketnav";
    openmarketnav.className = "openmarketnav investorlogged";

    const link = document.createElement("a");
    link.href = "/outreach/listings";
    link.className = "nav-link w-nav-link";
    link.textContent = "Listings";

    openmarketnav.appendChild(link);

    const webflowNavItemsList = document.querySelector(".nav-menu.w-nav-menu");
    webflowNavItemsList.prepend(openmarketnav);
  },

  _renderLoginDemoNavItem: function (context, menuItems) {
    const corporateDiv = document.getElementById("corporatenav");
    if (corporateDiv) {
      corporateDiv.remove();
    }

    const corporatenavDiv = document.createElement("div");
    corporatenavDiv.id = "corporatenav";
    corporatenavDiv.classList.add("corporatenav");

    const loginDropdownDiv = document.createElement("div");
    loginDropdownDiv.classList.add("login-dropdown", "at-hide");

    const wDropdownDiv = document.createElement("div");
    wDropdownDiv.classList.add("z-1", "w-dropdown");

    const navLinkLoginDiv = document.createElement("div");
    navLinkLoginDiv.classList.add("nav-link-login", "w-dropdown-toggle");
    navLinkLoginDiv.id = "w-dropdown-toggle-4";
    navLinkLoginDiv.setAttribute("aria-controls", "w-dropdown-list-4");
    navLinkLoginDiv.setAttribute("aria-haspopup", "menu");
    navLinkLoginDiv.setAttribute("aria-expanded", "false");
    navLinkLoginDiv.setAttribute("role", "button");
    navLinkLoginDiv.setAttribute("tabindex", "0");

    // Create the login arrow icon
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icon-2", "w-icon-dropdown-toggle");
    iconDiv.setAttribute("aria-hidden", "true");

    // Create the login button div
    const lofinNavDiv = document.createElement("div");
    lofinNavDiv.classList.add("lofin-nav");
    lofinNavDiv.textContent = "Login";

    navLinkLoginDiv.appendChild(iconDiv);
    navLinkLoginDiv.appendChild(lofinNavDiv);
    wDropdownDiv.appendChild(navLinkLoginDiv);
    loginDropdownDiv.appendChild(wDropdownDiv);
    corporatenavDiv.appendChild(loginDropdownDiv);

    const menuDropdownList3Nav = document.createElement("nav");
    menuDropdownList3Nav.classList.add(
      "menu-dropdown-list3",
      "w-dropdown-list"
    );
    menuDropdownList3Nav.id = "w-dropdown-list-4";
    menuDropdownList3Nav.setAttribute("aria-labelledby", "w-dropdown-toggle-4");

    const layoutGridDiv = document.createElement("div");
    layoutGridDiv.classList.add("w-layout-grid", "menu-dropdown-grid3");

    // create a loop to render menu items

    // Loop through the menuItems array and create menu items
    menuItems.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.classList.add("menu-dropdown-grid-item");
      menuItem.innerHTML = `
    <a href="${item.link}" class="menu-link w-inline-block" tabindex="0">
        <div class="menu-icon-block">
            <img src="${item.iconSrc}" loading="lazy" alt="${item.iconAlt}" class="${item.iconClass}">
        </div>
        <div class="menu-link-item">
            <div class="menu-link-title">${item.title}</div>
            <div class="menu-subtitle">${item.subtitle}</div>
        </div>
    </a>
  `;
      layoutGridDiv.appendChild(menuItem);
    });

    menuDropdownList3Nav.appendChild(layoutGridDiv);
    wDropdownDiv.appendChild(menuDropdownList3Nav);

    // Create the Book a Demo button
    const bookDemoButton = document.createElement("a");
    bookDemoButton.href = "/book-a-demo";
    bookDemoButton.id = "signup-demo";
    bookDemoButton.classList.add(
      "button-fiiled",
      "margin-left-medium",
      "auto",
      "w-button"
    );
    bookDemoButton.textContent = "Book a Demo";

    corporatenavDiv.appendChild(bookDemoButton);

    // append the login / signup / demo to an navbar Items List element
    const webflowNavItemsList = document.querySelector(".nav-menu.w-nav-menu");
    webflowNavItemsList.appendChild(corporatenavDiv);

    loginDropdownDiv.addEventListener("click", function () {
      const navLinkLogin = document.querySelector(".nav-link-login");
      const menuDropLevel1 = document.querySelector(".login-dropdown.at-hide");
      const menuDropList2 = menuDropLevel1.querySelector(".z-1.w-dropdown");
      const menuDropList3 = menuDropList2.querySelector(
        ".menu-dropdown-list3.w-dropdown-list"
      );

      navLinkLogin.classList.toggle("w--open");
      menuDropList3.classList.toggle("w--open");

      const isExpanded = navLinkLogin.classList.contains("w--open");
      navLinkLogin.setAttribute("aria-expanded", isExpanded.toString());
    });
  },
  _removeLoginDemoNavItem: function () {
    const corporateDiv = document.getElementById("corporatenav");
    if (corporateDiv) {
      corporateDiv.remove();
    }
  },
  _renderMobileCogwheelIcon: function () {
    const webflowNavItemsList = document.querySelector(".nav-menu.w-nav-menu");

    const existingIcon = document.querySelector(
      ".openmarketnav.openmarket-cogwheel"
    );

    if (existingIcon) {
      existingIcon.remove();
    }
    const openmarketnav = document.createElement("div");
    openmarketnav.id = "openmarketnav";
    openmarketnav.className = "openmarketnav openmarket-cogwheel";

    const link = document.createElement("a");
    link.href = "#";
    link.className = "nav-link cogwheel-mb w-inline-block";

    const image = document.createElement("img");
    image.src =
      "https://assets-global.website-files.com/633e5454c8dec0fa090556c5/651d0a2aa7ba2062973396da_Settings_Icon.png";
    image.loading = "lazy";
    image.id = "settings";
    image.alt = "";

    link.appendChild(image);
    openmarketnav.appendChild(link);

    webflowNavItemsList.appendChild(openmarketnav);
  },
  _removeMobileCogwheelIcon: function () {
    const existingIcon = document.querySelector(
      ".openmarketnav.openmarket-cogwheel"
    );

    if (existingIcon) {
      existingIcon.remove();
    }
  },
  _renderMobileLoginNavItem: function (context, menuItems) {
    const mobileRightView = document.querySelector(".right-view-mb");
    const existingLogin = document.querySelector(
      "login-dropdown.at-hide.hide-login.corporatenav"
    );
    if (existingLogin) {
      existingLogin.remove();
    }
    if (mobileRightView) {
      const loginDropdownDiv = document.createElement("div");
      loginDropdownDiv.classList.add(
        "login-dropdown",
        "at-hide",
        "hide-login",
        "corporatenav"
      );

      const wDropdownDiv = document.createElement("div");
      wDropdownDiv.classList.add("z-1", "w-dropdown");
      // wDropdownDiv.id = "mobile-rightview-dropdown-z1";

      const navLinkLoginDiv = document.createElement("div");
      navLinkLoginDiv.classList.add("nav-link-login", "w-dropdown-toggle");
      navLinkLoginDiv.id = "w-dropdown-toggle-4";
      navLinkLoginDiv.setAttribute("aria-controls", "w-dropdown-list-4");
      navLinkLoginDiv.setAttribute("aria-haspopup", "menu");
      navLinkLoginDiv.setAttribute("aria-expanded", "false");
      navLinkLoginDiv.setAttribute("role", "button");
      navLinkLoginDiv.setAttribute("tabindex", "0");

      // Create the login arrow icon
      const iconDiv = document.createElement("div");
      iconDiv.classList.add("icon-2", "w-icon-dropdown-toggle");
      iconDiv.setAttribute("aria-hidden", "true");

      // Create the login button div
      const lofinNavDiv = document.createElement("div");
      lofinNavDiv.classList.add("lofin-nav");
      lofinNavDiv.textContent = "Login";

      navLinkLoginDiv.appendChild(iconDiv);
      navLinkLoginDiv.appendChild(lofinNavDiv);
      wDropdownDiv.appendChild(navLinkLoginDiv);

      const menuDropdownList3Nav = document.createElement("nav");
      menuDropdownList3Nav.classList.add(
        "menu-dropdown-list3",
        "w-dropdown-list"
      );
      menuDropdownList3Nav.id = "w-dropdown-list-4";
      menuDropdownList3Nav.setAttribute(
        "aria-labelledby",
        "w-dropdown-toggle-4"
      );

      const layoutGridDiv = document.createElement("div");
      layoutGridDiv.classList.add("w-layout-grid", "menu-dropdown-grid3");

      // create a loop to render menu items

      // Loop through the menuItems array and create menu items
      menuItems.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-dropdown-grid-item");
        menuItem.innerHTML = `
    <a href="${item.link}" class="menu-link w-inline-block" tabindex="0">
        <div class="menu-icon-block">
            <img src="${item.iconSrc}" loading="lazy" alt="${item.iconAlt}" class="${item.iconClass}">
        </div>
        <div class="menu-link-item">
            <div class="menu-link-title">${item.title}</div>
            <div class="menu-subtitle">${item.subtitle}</div>
        </div>
    </a>
  `;
        layoutGridDiv.appendChild(menuItem);
      });

      menuDropdownList3Nav.appendChild(layoutGridDiv);
      wDropdownDiv.appendChild(menuDropdownList3Nav);

      loginDropdownDiv.appendChild(wDropdownDiv);
      mobileRightView.appendChild(loginDropdownDiv);
    }
  },
  _removeMobileLoginNavItem: function () {
    const existingLogin = document.querySelector(
      "login-dropdown.at-hide.hide-login.corporatenav"
    );
    if (existingLogin) {
      existingLogin.remove();
    }
  },
};
