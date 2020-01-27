import React, {useEffect, useState, useRef} from 'react';
import './style.css';
// import axios from 'axios';

const Header = (prop) => {
    const [getTemp] = useState(0);
    const [getTime, setTime] = useState("00:00 AM");

    //Element references
    const navbarToggler = useRef(null);
    const navbarMenu = useRef(null);
    const navbar = useRef(null);
    // const stickyWrapper = useRef(null);
    const navbarClose = useRef(null);
    const navbarItem = useRef(null);
    const navbarTime = useRef(null);
    const navbarTemp = useRef(null);
    const temperature = useRef(null);
    const time = useRef(null);
    const massSchedule = useRef(null);
    const email = useRef(null);
    const phone = useRef(null);
    const facebook = useRef(null);
    const twitter = useRef(null);
    const youtube = useRef(null);
    const mainMenu = useRef(null);

    //Get current temperature
    const setTempCallback = () => {};
    // navigator.geolocation.watchPosition((pos) => {
        // axios({
        //     url:"https://api.openweathermap.org/data/2.5/weather",
        //     method: 'get',
        //     params: {
        //         lat: pos.coords.latitude,
        //         lon: pos.coords.longitude,
        //         appid: 'a1f8ea13ceb084b2fc8527fa54ffa3c3',
        //         units:'imperial'
        //     },
        // }).then(result => setTemp(Math.round(result.data.main.temp)));
    // });

    //Get current time
    const setTimeCallback = () => {
        if(window.innerWidth < 1450) {
            setTime(new Date().toLocaleTimeString('en-US', {hc:'h12', hour:'numeric', minute:'numeric'}));
            time.current.classList.remove('fa-lg');
            temperature.current.classList.remove('fa-lg');
        }
        else {
            setTime(new Date().toLocaleDateString('en-US', {hc:'h12', hour:'numeric', minute:'numeric', weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'}));
            time.current.classList.add('fa-lg');
            temperature.current.classList.add('fa-lg');
        }
    };

    //Modify styling when the window size is changing
    const resizeCallback = () => {
        setTimeCallback();
        if(window.innerWidth < 1450) {
            massSchedule.current.classList.remove('fa-lg');
            email.current.classList.remove('fa-lg');
            phone.current.classList.remove('fa-lg');
            navbar.current.classList.remove("breakpoint-off");
            navbar.current.classList.add("breakpoint-on");
            facebook.current.classList.remove('fa-lg');
            twitter.current.classList.remove('fa-lg');
            youtube.current.classList.remove('fa-lg');
        } else {
            massSchedule.current.classList.add('fa-lg');
            email.current.classList.add('fa-lg');
            phone.current.classList.add('fa-lg');
            navbar.current.classList.remove("breakpoint-on");
            navbar.current.classList.add("breakpoint-off");
            facebook.current.classList.add('fa-lg');
            twitter.current.classList.add('fa-lg');
            youtube.current.classList.add('fa-lg');
        }
    };
    //Modify styling when the window is scrolled
    const scrollCallback = () => {
        const sticky = mainMenu.current.offsetTop;
        if (window.pageYOffset > sticky) {
        //   stickyWrapper.current.classList.add("is-sticky");
          mainMenu.current.classList.add("is-sticky");
        } else {
        //   stickyWrapper.current.classList.remove("is-sticky");
          mainMenu.current.classList.remove("is-sticky");
          setTempCallback();
          setTimeCallback();
      }
    }

    const activateSidebar = () => {
        if(window.innerWidth < 1450) {
            navbarToggler.current.classList.add("active")
            navbarMenu.current.classList.add("menu-on");
        } else {
            navbarToggler.current.classList.remove("active");
            navbarMenu.current.classList.remove("menu-on");
        }
    }

    const closeSidebar = () => {
        if(window.innerWidth < 1450)
            navbarToggler.current.classList.remove("active");
            navbarMenu.current.classList.remove("menu-on");
    }

    const toggleSubMenu = (index, e) => {
        e.stopPropagation()
        if(window.innerWidth < 1450) {
            for(let i = 0; i < navbarItem.current.children.length; i++) {
                if(i === index && !navbarItem.current.children[i].classList.contains("active")) {
                    navbarItem.current.children[i].classList.add("active");
                    navbarItem.current.children[i].children[1].setAttribute("style", "display:block; font-size:10px");
                }
                else {
                    navbarItem.current.children[i].classList.remove("active");    
                    if(navbarItem.current.children[i].children[1] !== undefined)
                        navbarItem.current.children[i].children[1].removeAttribute("style");
                }
            }
        }
    }

    //Add event handler after the element is rendered
    useEffect(() => {
        //Call all the callbacks to setup initial value after the element is mounted
        setTempCallback();
        setTimeCallback();
        resizeCallback();
        window.addEventListener("resize", resizeCallback);
        window.addEventListener("scroll", scrollCallback);
        //Unhook the event handlers when the element is unmounted
        return () => {
            window.removeEventListener("scroll", scrollCallback);
            window.removeEventListener("resize", resizeCallback);
        };
      });
    
    //JSX represent the header element
    return (
        <header className="header-area">
            <div className="top-header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="top-header-content d-flex flex-wrap align-items-center justify-content-between">
                                <div className="top-header-meta d-flex flex-wrap">
                                    <div><i className="fa fa-clock-o fa-lg time"aria-hidden="true" ref={time}></i><span ref={navbarTime}>{getTime}</span><i className="fa fa-thermometer-half fa-lg temperature" ref={temperature} aria-hidden="true"></i><span ref={navbarTemp}>{getTemp} &#176;F</span></div>
                                    <div className="top-social-info">
                                        <a href="https://www.facebook.com/cttdvn" aria-label="facebook"><i className="fa fa-facebook fa-lg" ref={facebook}></i></a>
                                        <a href="https://www.youtube.com/thanhtudaovietnam" aria-label="youtube"><i className="fa fa-youtube fa-lg" ref={youtube}></i></a>
                                        <a href="https://twitter.com/thanhtudaovn" aria-label="twitter"><i className="fa fa-twitter fa-lg" ref={twitter}></i></a>
                                    </div>
                                </div>
                                <div className="top-header-meta">
                                    <a href="massTime.html" className="email-address"><i className="fa fa-calendar-o fa-lg" aria-hidden="true" ref={massSchedule}></i><span>Giờ Lễ / MassTimes</span></a>
                                    <a href="mailto:info@cttdvnatl.org" className="email-address"><i className="fa fa-envelope fa-lg" aria-hidden="true" ref={email}></i> <span>info@cttdvnatl.org</span></a>
                                    <a href="tel:770-921-0077" className="phone"><i className="fa fa-phone fa-lg" aria-hidden="true" ref= {phone}></i> <span>770-921-0077</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <div className="crose-main-menu" ref={mainMenu}>
                    <div className="classy-nav-container breakpoint-off" ref={navbar}>
                        <div className="container">
                            <nav className="classy-navbar justify-content-between" id="croseNav">
                                <a href="/" className="nav-brand"><img src="img/core-img/gxlogo.png" alt=""/></a>
                                <div className="classy-navbar-toggler" onClick={activateSidebar}>
                                    <span className="navbarToggler" ref={navbarToggler}><span></span><span></span><span></span></span>
                                </div>
                                <div className="classy-menu" ref={navbarMenu} onClick={closeSidebar}>
                                    <div className="classycloseIcon">
                                        <div className="cross-wrap" ref={navbarClose}><span className="top"></span><span className="bottom"></span></div>
                                    </div>
                                    <div className="classynav">
                                        <ul ref={navbarItem}>
                                            <li className="cn-dropdown-item has-down" onClick={(e) => toggleSubMenu(0, e)}><a href="/#">GIÁO XỨ</a>
                                                <ul className="dropdown">
                                                    <li><a href="/">Trang Chủ</a></li>
                                                    <li><a href="about.html">Sứ Mệnh Giáo Xứ</a></li>
                                                    <li><a href="history.html">Lịch Sử Giáo Xứ</a></li>
                                                    <li><a href="https://drive.google.com/file/d/15MIqXgWDNfav8VOyCwepnhgZnvay7Eai/preview">Lịch Phụng Vụ</a></li>
                                                    <li><a href="priestSister.html">Linh Mục/Tu Sĩ</a></li>
                                                    <li><a href="directors">Qúy Chức</a></li>
                                                </ul>
                                                <span className="dd-trigger"></span>
                                            </li>
                                            <li className="cn-dropdown-item has-down" onClick={(e) => toggleSubMenu(1, e)}><a href="/#">TIN TỨC/SỰ KIỆN</a>
                                                <ul className="dropdown">
                                                    <li><a href="activites.html">Sinh Hoạt Giáo Xứ</a></li>
                                                    <li><a href="https://drive.google.com/file/d/15MIqXgWDNfav8VOyCwepnhgZnvay7Eai/preview">Lịch 2020</a></li>
                                                    <li><a href="https://fallfestivalatl.org">Hội Chợ Mùa Thu</a></li>
                                                    <li><a href="https://www.tomathienatl.org">TNTT Tôma Thiện</a></li>
                                                </ul>
                                                <span className="dd-trigger"></span>
                                            </li>
                                            <li className="cn-dropdown-item has-down" onClick={(e) => toggleSubMenu(2, e)}>
                                                <a href="/#">BAN NGÀNH</a>
                                                <ul className="dropdown">
                                                    <li><a href="org.html">Sơ Đồ Tổ Chức</a></li>
                                                    <li><a href="departments.html?x=KCS">Khối Cơ Sở</a></li>
                                                    <li><a href="departments.html?x=KDS">Khối Đời Sống</a></li>
                                                    <li><a href="departments.html?x=KGD">Khối Giáo Dục</a></li>
                                                    <li><a href="departments.html?x=KHC">Khối Hành Chánh</a></li>
                                                    <li><a href="departments.html?x=KPT">Khối Phụng Tự</a></li>
                                                    <li><a href="departments.html?x=KTG">Khối Truyền Giáo</a></li>
                                                    <li><a href="departments.html?x=KQT">Khối Quản Trị</a></li>
                                                    <li><a href="departments.html?x=KGQ">Khối Gây Quỹ</a></li>
                                                </ul>
                                                <span className="dd-trigger"></span>
                                            </li>
                                            <li className="cn-dropdown-item has-down" onClick={(e) => toggleSubMenu(3, e)}>
                                                <a href="/#">Thư Viện</a>
                                                <ul className="dropdown">
                                                    <li><a href="weeklyNews.html">Thông Tin Mục Vụ</a></li>
                                                    <li><a href="articles.html">Các Bài Viết</a></li>
                                                    <li><a href="catholic_teaching.html">Giáo Lý</a></li>
                                                    <li><a href="photos.html">Thư Viện Hình Ảnh</a></li>
                                                    <li><a href="forms.html">Đơn Từ</a></li>
                                                    <li><a href="prayerRequest.html">Prayer Request</a></li>
                                                </ul>
                                                <span className="dd-trigger"></span>
                                            </li>
                                            <li><a href="contact.html">LIÊN HỆ</a></li>
                                        </ul>
                                        <a href="https://giving.parishsoft.com/App/Giving/holy4545250" className="crose-btn header-btn">DÂNG HIẾN</a>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
        </header>
    );
};

export default Header;