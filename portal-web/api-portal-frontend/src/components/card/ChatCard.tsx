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
          <div className="font-medium transition-transform duration-300 group-hover:translate-x-1">体验中心</div>
          <div className="mt-[10%]">
            <img className="absolute w-[150%] max-w-[150%] transition-all duration-500 group-hover:scale-105" src={ChatThum} />
            <img className="absolute z-[2] bottom-[12%] left-[20%] transition-all duration-500 group-hover:bottom-[10%] group-hover:left-[22%]" src={ChatThumCard} />
          </div>
        </div>
        <div className="transition-transform duration-300 group-hover:translate-x-2">
          <Circle className="w-8 h-8">
            <ArrowRight className="fill-mainTitle" />
          </Circle>
        </div>
      </div>
    </CommonCard>
  )
}

export default HomeChatCard;