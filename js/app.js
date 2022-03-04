var dataUser = null;

function check_login() {
  var token = getCookie("token");
  if (token) {
    $.post(
      "/api/user/check_logined",
      {
        action: "check_logined",
      },
      function (data) {
        if (data.status == "success") {
          dataUser = data;
          dieu_huong();
        } else {
          dialogLogin.open();
        }
      }
    );
  } else {
    dialogLogin.open();
  }
}

function dieu_huong() {
  if (dataUser.roleID == 0) {
    location = "/user";
    return;
  }
  if (dataUser.roleID == 1) {
    location = "/admin";
    return;
  }
  return;
}
//==============MODAL===============//
var dialogLogin = $.confirm({
  title: "Đăng nhập",
  type: "green",
  typeAnimated: true,
  content:
    "" +
    '<form action="" class="formName">' +
    '<div class="form-group">' +
    "<label>Tên đăng nhập:</label>" +
    '<input type="text" placeholder="Tên đăng nhập" class="uid form-control" required />' +
    "</div>" +
    '<div class="form-group">' +
    "<label>Mật khẩu:</label>" +
    '<input type="password" placeholder="Mật khẩu" class="pwd form-control" required />' +
    "</div>" +
    "</form>",
  buttons: {
    confirm: {
      text: "Đăng nhập",
      btnClass: "btn-green",
      keys: ["enter"],
      action: function () {
        var uid = this.$content.find(".uid").val();
        var pwd = this.$content.find(".pwd").val();

        if (uid == "") {
          this.$content.find(".uid").focus();
          alert("Vui lòng tên người dùng !");
          return false;
        }
        if (pwd == "") {
          this.$content.find(".pwd").focus();
          alert("Vui lòng nhập mật khẩu !");
          return false;
        }

        var dialog_wait_login = $.confirm({
          title: "Đang xử lý",
          content: "Vui lòng đợi xử lý... ",
          buttons: {
            ok: {},
          },
        });

        $.post(
          "/api/user/login",
          {
            uid: uid,
            pwd: pwd,
          },
          function (data) {
            dialog_wait_login.close();
            console.log(data);
            if (data.status == "success") {
              dialogLogin.close();
              dataUser = data;
              dieu_huong();
            } else {
              $.confirm({
                title: "Cảnh báo",
                escapeKey: "ok",
                content: data.messenger,
                autoClose: "OK|5000",
                escapeKey: "OK",
                buttons: {
                  OK: {
                    text: "Đóng",
                    keys: ["enter", "t"],
                    btnClass: "btn-red",
                    action: function () {},
                  },
                },
                onDestroy: function () {
                  dialogLogin.$content.find(".pwd").focus();
                },
              });
            }
          }
        );
        return false;
      },
    },
  },
});

check_login();
