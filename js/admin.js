const api = "/api/user/check_logined";
var dataUser = null;

function check_login() {
  var token = getCookie("token");
  if (token) {
    $.post(
      api,
      {
        action: "check_logined",
      },
      function (data) {
        dataUser = data;
        if (data.status == "success") {
          dieu_huong();
          on_logined();
        } else {
          location = "/";
          return;
        }
      }
    );
  } else {
    location = "/";
  }
}

function dieu_huong() {
  if (dataUser.roleID == 0) {
    location = "/user";
    return;
  }
  return;
}

function on_logined() {
  // $("#id_name").html(dataUser.name);
}

$("#logOut").click(function (e) {
  e.preventDefault();
  $.confirm({
    title: "Đăng xuất",
    content: "Bạn có muốn đăng xuất ?",
    autoClose: "logoutUser|5000",
    buttons: {
      logoutUser: {
        btnClass: "btn-red",
        text: "Đăng xuất",
        action: function () {
          deleteCookie("token");
          check_login();
        },
      },
      cancel: function () {},
    },
  });
});

check_login();
