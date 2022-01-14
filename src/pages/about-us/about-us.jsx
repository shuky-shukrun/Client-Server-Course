import "../../App.css";
import InfoComponent from "../../components/info-component";
import {
  aboutUsInfo,
  expServiceInfo,
  saveDataInfo,
  whatIsServiceInfo,
} from "./about-info";
import ServiceComponent from "./service-component";
import ShukyPic from "../../images/shuky.jpg";
import BoazPic from "../../images/BoazPic.jpg";
import OrPic from "../../images/OrPic.jpg";
import TalPic from "../../images/TalPic.jpg";
import UziPic from "../../images/uzi.jpg";
import AmeerPic from "../../images/AmeerPic.jfif";

import TeamMember from "./team-member-component";
import { Card } from "react-bootstrap";

const AboutUsPage = (props) => {
  return (
    <div className="px-3 pb-3">
      <Card className="m-2">
        <InfoComponent title={"About Us"} info={aboutUsInfo.info} />

        <hr className="m-4"></hr>

        <InfoComponent title="Our Services">
          <div className="row">
            <ServiceComponent
              title={expServiceInfo.title}
              icon={expServiceInfo.icon}
              info={expServiceInfo.info}
            />
            <ServiceComponent
              title={saveDataInfo.title}
              icon={saveDataInfo.icon}
              info={saveDataInfo.info}
            />{" "}
            <ServiceComponent
              title={whatIsServiceInfo.title}
              icon={whatIsServiceInfo.icon}
              info={whatIsServiceInfo.info}
            />
          </div>
        </InfoComponent>

        <hr className="m-4"></hr>

        <InfoComponent title="Our Team">
          <div className="row">
            <TeamMember
              src={TalPic}
              name="Tal Zilberman"
              title="Software Engineering Student"
            />
            <TeamMember
              src={ShukyPic}
              name="Shuky Shukrun"
              title="Software Engineering Student"
            />
            <TeamMember
              src={BoazPic}
              name="Boaz Trauthwein"
              title="Software Engineering Student"
            />
            <TeamMember
              src={OrPic}
              name="Or Shteiner"
              title="Software Engineering Student"
            />
            <TeamMember
              src={AmeerPic}
              name="Ameer Dalal"
              title="Software Engineering Student"
            />
            <TeamMember
              src={UziPic}
              name="Uzin (The Dog)"
              title="The best dog!"
            />
          </div>
        </InfoComponent>
      </Card>
    </div>
  );
};

export default AboutUsPage;
