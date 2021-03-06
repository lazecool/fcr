var cars_data = {
    'bentley': {'title': '벤틀리', 'models':[
        {'name':'2017 벤틀리 뮬산', 'image':'cars_bentley_1.png', 'mileage': '7.6~11.1 km/L', 'fuel': '디젤, 가솔린'},
        {'name':'2017 벤틀리 뮬산 EW', 'image':'cars_bentley_2.png', 'mileage': '7.6~11.1 km/L', 'fuel': '디젤, 가솔린'}
    ]},
    'maserati': {'title': '마세라티', 'models':[]},
    'porsche': {'title': '포르쉐', 'models':[]},
    'benz': {'title': '메르세데스 벤', 'models':[]},
    'bmw': {'title': 'BMW', 'models':[]},
    'audi': {'title': '아우디', 'models':[]},
    'volkswagen': {'title': '폭스바겐', 'models':[]},
    'landrover': {'title': '랜드로버', 'models':[]},
    'jaguar': {'title': '재규어', 'models':[]},
    'toyota': {'title': '토요타', 'models':[]},
    'citroen': {'title': '치트로엥', 'models':[]},
    'fiat': {'title': '피아트', 'models':[]},
    'hyundai': {'title': '현태', 'models':[]},
    'kia': {'title': '기아', 'models':[]}
};

var page_data = {
    top: 0
};

(function(window){
    // Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state

        if(typeof State.data.scrollTop !== 'undefined') {
            if($('.msc_modal').is(':visible')) {
                close_cars_modal();
                $(document).scrollTop(State.data.scrollTop);
            }
        }

        if(typeof State.data.p !=='undefined' && State.data.p === 'brand' && typeof State.data.brand !== 'undefined') {
            open_cars_modal(State.data.brand);
        }

        if(typeof State.data.p !=='undefined' && State.data.p === 'agreement') {
            open_agreement_modal();
        }
    });

    // 브랜드 아이콘 템플릿 렌더링
    var $el_brand_container = $('.brand_icons');
    var brand_icons_template = Handlebars.compile($("#brand_icons_template").html());
    for(var brand in cars_data){
        var $li = $(brand_icons_template({'brand':brand}));
        $li.data(cars_data[brand]);
        $el_brand_container.append($li);
    }
})(window);

$(function(){
    $("a[href='#']").click(function(e){
        e.preventDefault();
    });

    // intro 랜덤 배경
    //var intro_bg_no = Math.floor(Math.random()*10%2+1);
    //$('.intro_area').addClass('bg' + intro_bg_no);

    // 스와이프
    $('.slides').slidesjs({
        navigation:{active:false},
        width: 568,
        height: 314,
        play: {
            auto: true,
            interval: 1500,
            swap: true,
            pauseOnHover: true,
            restartDelay: 2500
        }
    });

    // 브랜드 아이콘 클릭 이벤트
    $(".brand_icons a[data-brand]").on('click', function(){
        var brand = $(this).data('brand');
        var scrollTop = $(document).scrollTop();

        History.pushState({scrollTop:scrollTop}, null, "");
        History.pushState({p:'brand',brand:brand}, null, "");
    });

    // 이용자약관 클릭 이벤트
    $('.btn_agreement').on('click', function(){
        var scrollTop = $(document).scrollTop();

        History.pushState({scrollTop:scrollTop}, null, "");
        History.pushState({p:'agreement'}, null, "");
    });

    // Escape 모달 닫기
    $(window).on('keyup', function(e){
        if(e.keyCode===27 && $('.msc_modal').is(':visible')){
            e.preventDefault();
            close_cars_modal(e);
            history.back();
        }
    });

    $('.msc_modal_close').on('click', function(e){
        e.preventDefault();
        close_cars_modal(e);
    })
});

function open_cars_modal(brand){
    page_data.top = $(document).scrollTop();

    $('.msc_modal_tit').html(cars_data[brand].title);

    var cars_item_template = Handlebars.compile($("#cars_item_template").html());
    var html = cars_item_template(cars_data[brand]);

    $('.msc_container').hide();
    $('.cars_container').show().html(html);
    $('.msc_modal').show();
    $('.content_wrap').hide();
}

function open_agreement_modal(){
    $('.msc_modal_tit').html('이용자약관');

    $('.msc_container').hide();
    $('.agreement_container').show();
    $('.msc_modal').show();
    $('.content_wrap').hide();
}

function close_cars_modal(){
    $('.msc_modal').hide();
    $('.content_wrap').show();
    $(document).scrollTop(page_data.top);
}
