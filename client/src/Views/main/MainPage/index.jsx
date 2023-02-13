import React from "react";
import CourseBlock from "../../components/course block/CourseBlock";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import MainTitle from "../../components/titles/MainTitle";
import AdditionalInformation from "../../sections/Additional Information/AdditionalInformation";
import CoverPage from "../../sections/cover-page/CoverPage";
import {ReactComponent as CourseImageA1} from "../../images/course images/A1.svg"
import {ReactComponent as CourseImageA2} from "../../images/course images/A2.svg"
import {ReactComponent as CourseImageB1} from "../../images/course images/B1.svg"
import {ReactComponent as CourseImageB2} from "../../images/course images/B2.svg"
import {ReactComponent as CourseImageC1} from "../../images/course images/C1.svg"
import {ReactComponent as CourseImageC2} from "../../images/course images/C2.svg"
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/top button/TopButton";

function MainPage() {
    return ( 
        <div className="big-container">
            <Sidebar />
            <div className="right-main-container">
                <Header />
                <CoverPage />
                <AdditionalInformation />
                <div className="right-container after-relative">
                    <MainTitle>Անհատական դասընթաց անգլերենի ձեր մակարդակին <br/> համապատասխան</MainTitle>
                    <CourseBlock 
                        title="Անգլերենի դասընթաց A1 մակարդակի համար"
                        description="Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին: Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին:"
                        tags={["դասընթաց", "A1"]}
                        date="2023.01.10"
                        Image={CourseImageA1}
                        proggress={37}
                    />
                    <MainTitle>Հաջորդ դասընթացը</MainTitle>
                    <CourseBlock 
                        title="Անգլերենի դասընթաց A2 մակարդակի համար"
                        description="Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին: Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին:"
                        tags={["դասընթաց", "A2"]}
                        date="2023.01.10"
                        Image={CourseImageA2}
                        proggress={false}
                    />
                    <CourseBlock 
                        title="Անգլերենի դասընթաց B1 մակարդակի համար"
                        description="Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին: Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին:"
                        tags={["դասընթաց", "B1"]}
                        date="2023.01.10"
                        Image={CourseImageB1}
                        proggress={false}
                    />
                    <CourseBlock 
                        title="Անգլերենի դասընթաց B2 մակարդակի համար"
                        description="Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին: Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին:"
                        tags={["դասընթաց", "B2"]}
                        date="2023.01.10"
                        Image={CourseImageB2}
                        proggress={false}
                    />
                    <CourseBlock 
                        title="Անգլերենի դասընթաց C1 մակարդակի համար"
                        description="Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին: Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին:"
                        tags={["դասընթաց", "C1"]}
                        date="2023.01.10"
                        Image={CourseImageC1}
                        proggress={false}
                    />
                    <CourseBlock 
                        title="Անգլերենի դասընթաց C2 մակարդակի համար"
                        description="Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին: Անգլերեն խոսելը 21-րդ դարում շատ կարևոր է: Ամրագրեք ձեր տեղը #TESOL և #TEFL երաշխավորում ստացած մեր ուսուցիչների մոտ և եղեք 1 քայլով ավելի մոտ Ձեր երազանքին:"
                        tags={["դասընթաց", "C2"]}
                        date="2023.01.10"
                        Image={CourseImageC2}
                        proggress={false}
                    />
                </div>
                <Footer />
            </div>
            <TopButton />
        </div>
    );
}

export default MainPage;