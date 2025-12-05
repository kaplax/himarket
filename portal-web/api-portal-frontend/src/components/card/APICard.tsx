import More from "../../assets/more.svg";
import Circle from "./circle";
import { ArrowRight, Type, Image, SquarePlay, AudioLines } from "../icon";
import CommonCard from "./CommonCard";

const code = [
  {
    "api_name": "Qwen-Text-Generation",
    "type": "Text Generation",
    "protocol": "HTTPS",
    "domain": "qwen-text.aliyuncs.com",
    "model_service": "qwen-max"
  },
  {
    "api_name": "DeepSeek-Coder-API",
    "type": "Text Generation",
    "protocol": "HTTPS",
    "domain": "deepseek-coder.api.deepseek.com",
    "model_service": "deepseek-coder-33b-instruct"
  },
  {
    "api_name": "Stable-Diffusion-Image-Gen",
    "type": "Image Generation",
    "protocol": "HTTPS",
    "domain": "sd-image-gen.ai-gateway.example.com",
    "model_service": "stabilityai/stable-diffusion-xl-base-1.0"
  },
  {
    "api_name": "Qwen-VL-Multimodal",
    "type": "Multimodal Understanding and Generation",
    "protocol": "HTTPS",
    "domain": "qwen-vl.aliyuncs.com",
    "model_service": "qwen-vl-plus"
  },
  {
    "api_name": "Open-Sora-Video-Gen",
    "type": "Video Generation",
    "protocol": "HTTPS",
    "domain": "video-gen.open-sora.ai",
    "model_service": "open-sora-1.0"
  }
]

function HomeAPICard() {
  return (
    <CommonCard to="/apis">
      <div
        className="absolute w-full h-full z-[1]"
        style={{
          background: "linear-gradient(324deg, #C6D9FF 0%, #E1EBFF 21%, #FFFFFF 99%)",
        }}
      />
      <div className="absolute w-full h-full z-[2] left-[-10%]">
        <pre className="text-white/60 text-xs px-2">
          {JSON.stringify(code, null, 2)}
        </pre>
      </div>
      <div className="h-full relative z-[3] flex flex-col justify-between p-6">
        <div className="h-full relative flex flex-col gap-4">
          <div className="font-medium">API 市场</div>
          <div className="flex pl-3">
            {
              [
                <Type />,
                <Image />,
                <SquarePlay />,
                <AudioLines />,
              ].map((icon, i) => (
                <Circle
                  className="w-12 h-12"
                  style={{ marginLeft: -12 }} key={i}>
                  {icon}
                </Circle>
              ))
            }
            <img src={More} style={{ marginLeft: -12 }} />
          </div>
          <div className="flex-1 w-full relative mt-[10%]">
            <Terminal className="w-3/4">
              <pre className="text-white/60 max-h-24  overflow-hidden text-[6px]">
                {JSON.stringify(code, null, 2)}
              </pre>
            </Terminal>
            <div
              className="h-24 w-3/4 rounded-md absolute border left-[20%] border-white z-[-1] top-[20%]"
              style={{
                background: "linear-gradient(313deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 85%)",
                backdropFilter: "blur(10px)"
              }}>

            </div>
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

function Terminal(props: React.PropsWithChildren<{ className?: string }>) {
  const { className, children } = props;
  return (
    <div className={`rounded-md overflow-hidden ${className}`}>
      <div className="px-3 bg-white h-3 w-full flex items-center gap-1">
        <div className="w-[6px] h-[6px] rounded-full bg-[#EF4444]"></div>
        <div className="w-[6px] h-[6px] rounded-full bg-[#EAB308]"></div>
        <div className="w-[6px] h-[6px] rounded-full bg-[#22C55E]"></div>
      </div>
      <div className="min-h-20" style={{ background: "linear-gradient(138deg, rgba(82, 82, 82, 0.8) 0%, rgba(31, 31, 31, 0.95) 79%)" }}>
        {children}
      </div>
    </div>
  )
}

export default HomeAPICard;