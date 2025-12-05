import ChatThum from "../../assets/chat-thum.svg";
import ChatThumCard from "../../assets/chat-thum-card.svg";
import Circle from "./circle";
import { ArrowRight } from "../icon";
import CommonCard from "./CommonCard";

function HomeChatCard() {
  return (
    <CommonCard to="/chats">
      <div
        className="absolute w-full h-full z-[1]"
        style={{
          background: "linear-gradient(324deg, #C6CFFF 0%, #E1E6FF 29%, #FFFFFF 100%)",
        }}
      />
      <div className="h-full relative z-[3] flex flex-col justify-between p-6">
        <div className="flex flex-col gap-4">
          <div className="font-medium">体验中心</div>
          <div className="mt-[10%]">
            <img className="absolute w-[150%] max-w-[150%]" src={ChatThum} />
            <img className="absolute z-[2] bottom-[12%] left-[20%]" src={ChatThumCard} />
          </div>
        </div>
        <div>
          <Circle className="w-8 h-8">
            <ArrowRight className="fill-mainTitle" />
          </Circle>
        </div>
      </div>
    </CommonCard>
  )
}

export default HomeChatCard;