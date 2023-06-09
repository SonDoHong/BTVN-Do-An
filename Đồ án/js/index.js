window.onload = function(e){ 
    var userLocalStorage = function() {
        const userString = localStorage.getItem("user-do-an");

        const user = JSON.parse(userString);

        return user;
    };

    var checkLogin = function(user) {
        // Lấy user từ localStorage
        // const userString = localStorage.getItem("user-do-an");

        // const user = JSON.parse(userString);
        // console.log(user.email)

        //check user có tồn tại hay không
        if(user && user.uid){
            // nếu người dùng ở trang đăng ký và login sẽ chuyển hướng về trang chủ
            // mình phải có điều kiện kiểm tra urll, tránh trường hợp web bị load lại nhiều lần
            if(window.location.pathname == '/login/register.html' || window.location.pathname == '/login/login.html'){
                window.location.href = '/index.html';
            }
        }else{
            // chưa login
            if(window.location.pathname != '/login/register.html' && window.location.pathname != '/login/login.html'){
                window.location.href = '/login/login.html';
                // logOut(user)
            }
        }
    }

    var checkUserLogin = function(user){
        // Lấy user từ localStorage
        // const userString = localStorage.getItem("user-do-an");

        // const user = JSON.parse(userString);
        //check user có tồn tại hay không
        if(user && user.uid){
            getUserElm(user);
            return true;
        }else{
            // chưa login
            return false;
        }
    }


    var getUserElm = function(user) {
        let userEml = document.querySelector('.header-user')
        let userEml2 = document.querySelector('.header-user-2');
        let userNameElm = document.querySelector('.header-user-name');

        // if (typeOf == true) {
            userEml.style.display = 'none';
            userEml2.style.display = 'flex';
            userNameElm.textContent = user.email;
        // }
        logOut();
    }
    

    var logOut = function() {
        let logOutElm = document.querySelector('#log_out');
        logOutElm.addEventListener('click', function() {
            localStorage.clear();
            return window.location.href = '/login/login.html';
        });
    };

    
    checkLogin(userLocalStorage());
    checkUserLogin(userLocalStorage())
}