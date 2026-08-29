const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navDropdowns = document.querySelectorAll("[data-nav-dropdown]");
const cart = [];
const currentPage = document.documentElement.dataset.page || "home";
const shopPassword = "mmc2021";
const shopAccessKey = "meowme-shop-access";
const parentsAreaUrl = "index.html?page=parents";
const shopLoginUrl = "index.html?page=shop";

const cartCountNodes = document.querySelectorAll("[data-cart-count]");
const cartCountLabel = document.querySelector("[data-cart-count-label]");
const cartItemsNode = document.querySelector("[data-cart-items]");
const cartTotalNode = document.querySelector("[data-cart-total]");
const checkoutButton = document.querySelector("[data-checkout]");
const paymentModal = document.querySelector("[data-payment-modal]");
const paymentItemsNode = document.querySelector("[data-payment-items]");
const paymentTotalNode = document.querySelector("[data-payment-total]");
const orderCodeNode = document.querySelector("[data-order-code]");
const whatsappOrderLink = document.querySelector("[data-whatsapp-order]");
const emailOrderLink = document.querySelector("[data-email-order]");
const shopLockNode = document.querySelector("[data-shop-lock]");
const shopPrivateNode = document.querySelector("[data-shop-private]");
const shopPasswordForm = document.querySelector("[data-shop-password-form]");
const shopPasswordInput = document.querySelector("[data-shop-password-input]");
const shopPasswordError = document.querySelector("[data-shop-password-error]");

const scrollToElement = (target, behavior = "auto") => {
  const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height || 0;
  const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 24;
  window.scrollTo({ top: Math.max(0, top), behavior });
};

const scrollToHashTarget = (behavior = "auto") => {
  if (!window.location.hash) return false;
  let targetId = window.location.hash.slice(1);
  try {
    targetId = decodeURIComponent(targetId);
  } catch (error) {
    targetId = window.location.hash.slice(1);
  }
  const target = document.getElementById(targetId);
  if (target) {
    scrollToElement(target, behavior);
    return true;
  }
  return false;
};

window.addEventListener("load", () => {
  [80, 350, 800, 1300, 1800].forEach((delay) => {
    window.setTimeout(() => scrollToHashTarget("auto"), delay);
  });
});

const shopProducts = [
  {
    category: "nutrition",
    type: "汪喵星球",
    name: "汪喵 - 腸胃益生菌",
    detail: "一盒30包 · 建議看門口，貓貓肚痾時用",
    cartName: "汪喵 - 腸胃益生菌 一盒30包",
    price: 169,
    image: "assets/products/dogcatstar-probiotics.jpg",
    alt: "汪喵腸胃益生菌一盒30包",
  },
  {
    category: "nutrition",
    type: "汪喵星球",
    name: "汪喵 - 提升免疫力粉",
    detail: "適合幼/老貓/體質虛弱，健康貓日常營養補充",
    cartName: "汪喵 - 提升免疫力粉",
    price: 210,
    image: "assets/products/dogcatstar-immune.png",
    alt: "汪喵提升免疫力粉",
  },
  {
    category: "nutrition",
    type: "汪喵星球",
    name: "汪喵 - 牛磺酸（重要營養）",
    detail: "自身無法產生，需要補充；視網膜、腦部、心臟與神經系統保健",
    cartName: "汪喵 - 牛磺酸（重要營養）",
    price: 78,
    image: "assets/products/dogcatstar-taurine.jpg",
    alt: "汪喵牛磺酸重要營養",
  },
  {
    category: "food",
    type: "貓罐頭",
    name: "貓罐頭 - 綜合口味",
    detail: "一箱24罐",
    cartName: "貓罐頭 - 綜合口味 一箱24罐",
    price: 318,
    image: "assets/products/dogcatstar-catsoup.jpg",
    alt: "貓罐頭綜合口味一箱24罐",
  },
  {
    category: "food",
    type: "Brabanconne",
    name: "Brabanconne 幼貓雞肉味",
    detail: "2.5kg",
    cartName: "Brabanconne 幼貓雞肉味 2.5kg",
    price: 220,
    image: "assets/products/brabanconne-kitten.png",
    alt: "Brabanconne幼貓雞肉味2.5kg",
  },
  {
    category: "food",
    type: "Brabanconne",
    name: "Brabanconne 幼貓雞肉味",
    detail: "20KG",
    cartName: "Brabanconne 幼貓雞肉味 20KG",
    price: 900,
    image: "assets/products/brabanconne-kitten-chicken-20kg.jpg",
    alt: "Brabanconne日常系列幼貓雞肉配方20KG",
  },
  {
    category: "food",
    type: "Brabanconne",
    name: "Brabanconne 日常系列成貓魚肉配方",
    detail: "2.5KG",
    cartName: "Brabanconne 日常系列成貓魚肉配方 2.5KG",
    price: 220,
    image: "assets/products/brabanconne-adult-fish-25kg.jpg",
    alt: "Brabanconne日常系列成貓魚肉配方2.5KG",
  },
  {
    category: "food",
    type: "Brabanconne",
    name: "Brabanconne 日常系列成貓鮮雞肉配方",
    detail: "2.5KG",
    cartName: "Brabanconne 日常系列成貓鮮雞肉配方 2.5KG",
    price: 220,
    image: "assets/products/brabanconne-adult-chicken-25kg.jpg",
    alt: "Brabanconne日常系列成貓鮮雞肉配方2.5KG",
  },
  {
    category: "food",
    type: "Brabanconne",
    name: "Brabanconne 日常系列成貓魚肉配方",
    detail: "20KG",
    cartName: "Brabanconne 日常系列成貓魚肉配方 20KG",
    price: 1050,
    image: "assets/products/brabanconne-adult-fish-20kg.jpg",
    alt: "Brabanconne日常系列成貓魚肉配方20KG",
  },
  {
    category: "food",
    type: "PURINA PRO PLAN",
    name: "PURINA® PRO PLAN® 舒敏系列™ 幼貓配方 (雞肉)",
    detail: "3.2磅 · LiveClear 幼貓雞肉配方",
    cartName: "PURINA® PRO PLAN® 舒敏系列™ 幼貓配方 (雞肉) 3.2磅",
    price: 210,
    image: "assets/products/purina-pro-plan-liveclear-kitten-chicken.webp",
    alt: "PURINA PRO PLAN 舒敏系列幼貓配方雞肉3.2磅",
  },
  {
    category: "medical",
    type: "醫療及藥品",
    name: "Revolution Plus 貓用7合1滴頸劑",
    detail: "貓用 7 合 1 滴頸劑",
    cartName: "Revolution Plus 貓用7合1滴頸劑",
    price: 270,
    image: "assets/products/revolution-plus-cat-7in1.jpg",
    alt: "Revolution Plus 貓用7合1滴頸劑",
  },
  {
    category: "medical",
    type: "醫療及藥品",
    name: "Bayer Drontal 貓用杜蟲藥【一排8 粒裝】",
    detail: "6個月以下幼貓需每月1次 · 6個月以上3個月1次",
    cartName: "Bayer Drontal 貓用杜蟲藥【一排8 粒裝】",
    price: 178,
    image: "assets/products/bayer-drontal-cat-dewormer.webp",
    alt: "Bayer Drontal 貓用杜蟲藥一排8粒裝",
  },
  {
    category: "medical",
    type: "醫療及藥品",
    name: "Bayer Drontal 貓用杜蟲藥 24片(一盒)",
    detail: "24片一盒 · 貓用杜蟲藥",
    cartName: "Bayer Drontal 貓用杜蟲藥 24片(一盒)",
    price: 510,
    image: "assets/products/bayer-drontal-cat-dewormer-24.webp",
    alt: "Bayer Drontal 貓用杜蟲藥24片一盒",
  },
  {
    category: "medical",
    type: "醫療及藥品",
    name: "Bayer Advocate 心疥爽小型貓用殺蚤劑 4KG 以下",
    detail: "適用 4KG 以下小型貓 · 例如跳蚤、心絲蟲等等",
    cartName: "Bayer Advocate 心疥爽小型貓用殺蚤劑 4KG 以下",
    price: 313,
    image: "assets/products/bayer-advocate-small-cat.webp",
    alt: "Bayer Advocate 心疥爽小型貓用殺蚤劑4KG以下",
  },
  {
    category: "daycare",
    type: "專屬托兒所",
    name: "專屬托兒所 - 一隻寵物",
    detail: "整個房間 · 一隻寵物每日托管",
    cartName: "專屬托兒所 - 一隻寵物 $200 /天",
    price: 200,
    priceSuffix: " /天",
    image: "assets/products/private-daycare-room.jpeg",
    alt: "Meow Me Cattery 專屬托兒所整個房間",
  },
  {
    category: "daycare",
    type: "專屬托兒所",
    name: "專屬托兒所 - 兩隻寵物",
    detail: "整個房間 · 兩隻寵物每日托管",
    cartName: "專屬托兒所 - 兩隻寵物 $300 /天",
    price: 300,
    priceSuffix: " /天",
    image: "assets/products/private-daycare-room.jpeg",
    alt: "Meow Me Cattery 專屬托兒所整個房間",
  },
];

const shopProductCategories = [
  {
    id: "food",
    label: "Food",
    name: "主食糧罐",
    description: "罐頭及幼貓乾糧，方便家長按日常主食需要選購。",
  },
  {
    id: "nutrition",
    label: "Nutrition",
    name: "營養保健",
    description: "益生菌、免疫力粉、牛磺酸等日常營養補充。",
  },
  {
    id: "daily",
    label: "Daily Essentials",
    name: "日常用品",
    description: "飲水、清潔及生活小物等日常照顧用品，整理好後會陸續上架。",
  },
  {
    id: "litter",
    label: "Cat Litter",
    name: "貓砂",
    description: "貓砂、除味及清潔用品會按實際供應陸續更新。",
  },
  {
    id: "medical",
    label: "Medical",
    name: "醫療及藥品",
    description: "我已明白以及確認此產品為獸醫處方產品 ，並確定您的寵物已經接受獸醫檢查，及得到獸醫建議服用此處方產品。",
  },
  {
    id: "daycare",
    label: "Daycare",
    name: "專屬托兒所",
    description: "獨立整個房間托管，按寵物數量選擇每日方案。",
    countLabel: "項服務",
  },
  {
    id: "grooming",
    label: "Grooming",
    name: "貓貓美容",
    description: "美容洗護及護理服務整理中，稍後會於此分類開放選購。",
    countLabel: "項服務",
  },
];

const formatPrice = (value) => `$${value.toLocaleString("en-US")}`;

const getCartTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
const getCartCount = () => cart.reduce((sum, item) => sum + item.quantity, 0);

function getShopAccess() {
  try {
    return sessionStorage.getItem(shopAccessKey) === "true";
  } catch {
    return false;
  }
}

function setShopAccess() {
  try {
    sessionStorage.setItem(shopAccessKey, "true");
  } catch {
    // Browsing still works even when sessionStorage is unavailable.
  }
}

function showProtectedShop() {
  if (shopPrivateNode) {
    shopPrivateNode.hidden = false;
  }

  if (shopLockNode) {
    shopLockNode.hidden = true;
  }
}

function showShopPasswordGate() {
  if (shopPrivateNode) {
    shopPrivateNode.hidden = true;
  }

  if (shopLockNode) {
    shopLockNode.hidden = false;
  }
}

function initShopPasswordGate() {
  if (!shopLockNode || !shopPrivateNode) return;

  if (currentPage === "parents") {
    if (getShopAccess()) {
      showProtectedShop();
      return;
    }

    window.location.replace(shopLoginUrl);
    return;
  }

  if (currentPage !== "shop") return;

  if (getShopAccess()) {
    window.location.replace(parentsAreaUrl);
    return;
  }

  showShopPasswordGate();
  shopPasswordInput?.focus();

  shopPasswordForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const password = shopPasswordInput?.value.trim();

    if (password === shopPassword) {
      setShopAccess();
      showProtectedShop();
      shopPasswordForm.reset();
      if (shopPasswordError) {
        shopPasswordError.hidden = true;
      }
      window.location.href = parentsAreaUrl;
      return;
    }

    if (shopPasswordError) {
      shopPasswordError.hidden = false;
    }
    shopPasswordInput?.select();
  });
}

function injectProductStyles() {
  if (document.querySelector("#product-image-style")) return;
  const style = document.createElement("style");
  style.id = "product-image-style";
  style.textContent = `
    .product-card { min-height: 0; padding: 18px; }
    .product-image {
      display: grid;
      place-items: center;
      aspect-ratio: 1;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: #fffaf8;
    }
    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 12px;
    }
  `;
  document.head.append(style);
}

function renderShopProducts() {
  const productGrid = document.querySelector(".product-grid");
  const productCategoryNav = document.querySelector("[data-product-category-nav]");
  if (!productGrid) return;

  injectProductStyles();
  const visibleCategories = shopProductCategories.map((category) => {
    return {
      ...category,
      products: shopProducts.filter((product) => product.category === category.id),
    };
  });

  if (productCategoryNav) {
    productCategoryNav.innerHTML = visibleCategories
      .map(
        (category) => `
          <a href="#product-category-${category.id}">${category.name}</a>
        `
      )
      .join("");
  }

  productGrid.innerHTML = visibleCategories
    .map((category) => {
      const { products } = category;
      return `
        <section class="product-category" aria-labelledby="product-category-${category.id}">
          <div class="product-category-heading">
            <div>
              <span>${category.label}</span>
              <h3 id="product-category-${category.id}">${category.name}</h3>
              <p>${category.description}</p>
            </div>
            <small>${products.length ? `${products.length} ${category.countLabel || "件貨品"}` : "即將上架"}</small>
          </div>
          <div class="product-category-grid">
            ${
              products.length
                ? products
                    .map(
                      (product) => `
        <article class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.alt}" loading="lazy" />
          </div>
          <span class="product-type">${product.type}</span>
          <h3>${product.name}</h3>
          <p>${product.detail}</p>
          <strong>${formatPrice(product.price)}${product.priceSuffix || ""}</strong>
          <button type="button" class="button product-button" data-add-product data-name="${product.cartName}" data-price="${product.price}">
            <svg><use href="#icon-plus" /></svg>
            加入購物車
          </button>
        </article>
      `,
                    )
                    .join("")
                : `
        <article class="product-card product-empty-card is-coming-soon">
          <span class="product-type">${category.name}</span>
          <h3>即將上架</h3>
          <p>呢個分類貨品整理中，稍後可以直接喺呢度選購。</p>
          <strong>Coming Soon</strong>
        </article>
      `
            }
          </div>
        </section>
      `;
    })
    .join("");
}

function createOrderCode() {
  const now = new Date();
  const datePart = now
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");
  const timePart = String(now.getHours()).padStart(2, "0") + String(now.getMinutes()).padStart(2, "0");
  return `MM${datePart}${timePart}`;
}

function buildOrderMessage(orderCode) {
  const lines = cart.map(
    (item, index) => `${index + 1}. ${item.name} x ${item.quantity} - ${formatPrice(item.price * item.quantity)}`,
  );

  return [
    "Meow Me Cattery 家長專區貨品訂單",
    `訂單編號：${orderCode}`,
    "",
    "訂單內容：",
    ...lines,
    "",
    `合計：${formatPrice(getCartTotal())}`,
    "付款方式：PayMe / AlipayHK / FPS 102184900",
    "",
    "客人姓名：",
    "聯絡電話：",
    "地址：",
    "",
    "我已付款，付款截圖如下。",
  ].join("\n");
}

function renderCart() {
  const count = getCartCount();
  const total = getCartTotal();

  cartCountNodes.forEach((node) => {
    node.textContent = String(count);
  });

  if (cartCountLabel) {
    cartCountLabel.textContent = `${count} 件`;
  }

  if (cartTotalNode) {
    cartTotalNode.textContent = formatPrice(total);
  }

  if (checkoutButton) {
    checkoutButton.disabled = count === 0;
  }

  if (!cartItemsNode) return;

  if (count === 0) {
    cartItemsNode.innerHTML = '<p class="cart-empty">尚未選購項目</p>';
    return;
  }

  cartItemsNode.innerHTML = cart
    .map(
      (item, index) => `
        <div class="cart-line">
          <div class="cart-line-title">
            <strong>${item.name}</strong>
            <span>${formatPrice(item.price)} x ${item.quantity}</span>
          </div>
          <button type="button" data-remove-item="${index}" aria-label="移除 ${item.name}">
            <svg><use href="#icon-x" /></svg>
          </button>
        </div>
      `,
    )
    .join("");
}

function restoreScrollPosition(left, top) {
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(left, top);

  requestAnimationFrame(() => {
    window.scrollTo(left, top);
    setTimeout(() => {
      window.scrollTo(left, top);
      root.style.scrollBehavior = previousScrollBehavior;
    }, 80);
  });
}

function renderPaymentSummary() {
  if (!paymentItemsNode || !paymentTotalNode) return;
  const orderCode = createOrderCode();

  paymentItemsNode.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-line">
          <div class="cart-line-title">
            <strong>${item.name}</strong>
            <span>${formatPrice(item.price)} x ${item.quantity}</span>
          </div>
          <strong>${formatPrice(item.price * item.quantity)}</strong>
        </div>
      `,
    )
    .join("");

  paymentTotalNode.textContent = formatPrice(getCartTotal());

  if (orderCodeNode) {
    orderCodeNode.textContent = orderCode;
  }

  const orderMessage = buildOrderMessage(orderCode);

  if (whatsappOrderLink) {
    whatsappOrderLink.href = `https://wa.me/85261575928?text=${encodeURIComponent(orderMessage)}`;
  }

  if (emailOrderLink) {
    const subject = `Meow Me Cattery 家長專區貨品訂單 ${orderCode}`;
    emailOrderLink.href = `mailto:meowme.cattery@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(orderMessage)}`;
  }
}

function openPaymentModal() {
  if (!paymentModal || getCartCount() === 0) return;
  renderPaymentSummary();
  paymentModal.classList.add("is-open");
  paymentModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closePaymentModal() {
  if (!paymentModal) return;
  paymentModal.classList.remove("is-open");
  paymentModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

if (navToggle && siteNav) {
  const closeSiteNav = () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    navDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-open");
      dropdown.querySelector(".nav-dropdown-toggle")?.setAttribute("aria-expanded", "false");
    });
  };

  navDropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".nav-dropdown-toggle");
    button?.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = dropdown.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) {
      const targetUrl = new URL(link.href);
      const currentUrl = new URL(window.location.href);
      const isSamePageAnchor =
        targetUrl.pathname === currentUrl.pathname &&
        targetUrl.search === currentUrl.search &&
        targetUrl.hash;

      if (isSamePageAnchor) {
        const target = document.querySelector(targetUrl.hash);
        if (target) {
          event.preventDefault();
          scrollToElement(target, "smooth");
          history.pushState(null, "", targetUrl.hash);
        }
      }

      closeSiteNav();
    }
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      closeSiteNav();
    }
  });
}

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-product]");
  if (addButton) {
    const scrollLeft = window.scrollX;
    const scrollTop = window.scrollY;
    const name = addButton.dataset.name;
    const price = Number(addButton.dataset.price);
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    renderCart();
    restoreScrollPosition(scrollLeft, scrollTop);
    return;
  }

  const removeButton = event.target.closest("[data-remove-item]");
  if (removeButton) {
    const index = Number(removeButton.dataset.removeItem);
    cart.splice(index, 1);
    renderCart();
    return;
  }

  if (event.target.closest("[data-open-cart]")) {
    if (currentPage !== "shop" && currentPage !== "parents") {
      window.location.href = getShopAccess() ? parentsAreaUrl : shopLoginUrl;
      return;
    }

    document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (event.target.closest("[data-checkout]")) {
    openPaymentModal();
    return;
  }

  if (event.target.closest("[data-close-payment]") || event.target === paymentModal) {
    closePaymentModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePaymentModal();
  }
});

renderShopProducts();
initShopPasswordGate();
renderCart();
