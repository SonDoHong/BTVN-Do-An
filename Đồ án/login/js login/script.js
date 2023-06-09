// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBX4mAZtMfvMi0FP045_TBDkg8iKVntIUU",
    authDomain: "do-an-c587f.firebaseapp.com",
    databaseURL: "https://do-an-c587f-default-rtdb.firebaseio.com",
    projectId: "do-an-c587f",
    storageBucket: "do-an-c587f.appspot.com",
    messagingSenderId: "928801420475",
    appId: "1:928801420475:web:94305027271621c9b7259e",
    measurementId: "G-B0R645PVW0",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

var database = firebase.firestore();
let currentURL = window.location.href;
console.log(currentURL)
let newUrl = currentURL.replace("login/register.html", "index.html");

$( ".btn-register" ).on( "click", function() {
    $(this).attr("href", "./register.html");
    // alert('cc')
});

$( ".btn-login" ).on( "click", function() {
    $(this).attr("href", "./login.html");
    // alert('cc')
});

$("#register-form").validate({
    rules: {
        user_name: {
            required: true,
        },
        tel: {
            required: true,
            number: true,
            minlength: 9,
        },
        email: {
            required: true,
            email: true,
        },
        password: {
            required: true,
            minlength: 6,
        },
        password_again: {
            required: true,
            equalTo: "#password",
        },
    },
    messages: {
        user_name: {
            required: 'Hãy nhập họ và tên của bạn.',
        },
        tel: {
            required: "Hãy nhập số điện thoại của bạn",
            number: "Vui lòng nhập một số hợp lệ.",
            minlength: 'Số điện thoại không đúng.',
        },
        email: {
            required: "Hãy nhập email của bạn.",
            email: "Vui lòng nhập một địa chỉ email hợp lệ.",
        },
        password: {
            required: "Hãy nhập mật khẩu của bạn.",
            minlength: "Nhập ít nhất 6 kí tự.",
        },
        password_again: {
            required: 'Mật khẩu chưa đúng.',
            equalTo: "Chưa đúng.",
        },
    },

    submitHandler: function (form) {
        // some other code
        // maybe disabling submit button
        // then:
        var userName = $("#user_name").val();
        var tel = $("#tel").val();
        var email = $("#email").val();
        var password = $("#password").val();

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var uuid = userCredential.user.uid;

                database
                    .collection("users")
                    .doc(uuid)
                    .set({
                        displayName: userName,
                        tel: tel,
                        email: email,
                        password: password,
                        id: uuid,
                    })
                    .then(() => {
                        loginFn(email, password);
                    })

                    .catch((error) => {

                    });
            })
            .catch((error) => {
                console.log(error.code == 'auth/email-already-in-use')
                if (error.code == 'auth/email-already-in-use') {
                    alert('Email đã tồn tại.')
                }
            });
    },
});

$("#login-form").validate({
    rules: {
        email: {
            required: true,
            email: true,
        },
        password: {
            required: true,
            minlength: 6,
        }
    },
    messages: {
        email: {
            required: "Hãy nhập email của bạn.",
            email: "Vui lòng nhập một địa chỉ email hợp lệ.",
        },
        password: {
            required: "sai",
            minlength: "Nhập ít nhất 6 kí tự",
        },
    },

    submitHandler: function (form) {
        var email = $("#email").val();
        var password = $("#password").val();
        
       loginFn(email, password);
    },
});

var loginFn = function (email, password) {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (result) {
            const user = result.user;

            localStorage.setItem("user-do-an", JSON.stringify(user));
            window.location.href = newUrl;
        })
        .catch(function(error) {
            if (error.code == 'auth/user-not-found') {
                alert('Tên đăng nhập không tồn tại.')
            } if (error.code == 'auth/wrong-password') {
                alert('Mật khẩu không đúng.')
            }
        });
};


