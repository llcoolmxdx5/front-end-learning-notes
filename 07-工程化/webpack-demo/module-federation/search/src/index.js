Promise.all([import("nav/Header"), import("home/HomeList")]).then(
  ([{ default: Header }, { default: HomeList }]) => {
    document.body.appendChild(Header());
    document.body.innerHTML += HomeList(4);
  }
);
