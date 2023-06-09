
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
  measurementId: "G-B0R645PVW0"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

var database = firebase.firestore();

// var database = analytics.firestore();
var ref = database.collection('pitch');
ref.limit(1).get().then(async function(snapshots) {
    var datas = snapshots.docs;
    var data = datas[0].data();
    
    let cardListElm = document.querySelector('.card-list');
    let serviceData = data.service;

    let  cardItemFooter = '';
    for (let key in serviceData) {
        if (serviceData[key] == true) {

            cardItemFooter += `<div class="card-item-footer-item"><i class="fa-solid fa-check"></i><span>${key}</span></div>`;
        }
    }
    
    for (let i = 0; i < 8; i++) {
        let cardItemElm = document.createElement('div');
        cardItemElm.className = 'grid_col-3 grid_col-4 grid_col-6-s';

        cardItemElm.innerHTML = `<div class="card-item">
                                    <a href="#" class="card-item-link">
                                        <div class="card-item-img">
                                            <img src="./img/Sân bóng ${i + 3}.jpg" alt="">
                                        </div>

                                        <div class="card-item-infor">
                                            <h4 class="card-item-title">${data.title}</h4>

                                            <div class="card-item-price">Giá: <span>${data.price}.000 VND</span> / Trận</div>
                                        </div>

                                        <div class="card-item-footer">
                                            ${cardItemFooter}
                                        </div>
                                    </a>
                                </div>`;

        cardListElm.append(cardItemElm)      
    }

});

