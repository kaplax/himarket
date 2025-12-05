import HomeModelCardBg from "../../assets/home-model-card-bg.svg";
import DeepSeek from "../../assets/deepseek.svg";
import Qwen from "../../assets/qwen.svg";
import ChatGPT from "../../assets/chatgpt.svg";
import Empty from "../../assets/empty.svg";
import More from "../../assets/more.svg";
import Circle from "./circle";
import { ArrowRight } from "../icon";
import CommonCard from "./CommonCard";

function HomeModelCard() {
  return (
    <CommonCard to="/models">
      <div
        className="h-full"
        style={{
          backgroundImage: `url(${HomeModelCardBg})`, backgroundSize: "cover",
        }}
      >
        <div
          className="absolute w-full h-full z-[1] group-hover:opacity-60 transition-opacity duration-500"
          style={{
            background: "linear-gradient(306deg, #0D53FF 1%, rgba(80, 98, 244, 0.7) 59%, rgba(99, 102, 241, 0.09) 98%)",
            opacity: .4,
            mixBlendMode: "multiply"
          }}
        />
        <div className="h-full relative z-[3] flex flex-col justify-between p-6">
          <div className="flex flex-col gap-4">
            <div className="font-medium transition-transform duration-300 group-hover:translate-x-1">模型市场</div>
            <div className="flex pl-3">
              {[
                Qwen, DeepSeek, ChatGPT, Empty, More,
              ].map((img, index) => (
                <img
                  key={index}
                  style={{
                    marginLeft: -12,
                    transitionDelay: `${index * 50}ms`
                  }}
                  src={img}
                  className="transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                />
              ))}
            </div>
          </div>
          <div className="transition-transform duration-300 group-hover:translate-x-2">
            <Circle className="w-8 h-8">
              <ArrowRight className="fill-mainTitle" />
            </Circle>
          </div>
        </div>
      </div>
    </CommonCard>
  )
}

export default HomeModelCard