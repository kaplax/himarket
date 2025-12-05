import More from "../../assets/more.svg";
import Circle from "./circle";
import { ArrowRight } from "../icon";
import { Button } from "antd";
import CommonCard from "./CommonCard";

function HomeMCPCard() {
  return (
    <CommonCard to="/mcp">
      <div
        className="absolute w-full h-full z-[1]"
        style={{
          background: "linear-gradient(324deg, #C6D1FF 0%, #E1E7FF 21%, #FFFFFF 100%)",
        }}
      />
      <div className="h-full relative z-[3] flex flex-col justify-between p-6">
        <div className="flex flex-col gap-4">
          <div className="font-medium">MCP 市场</div>
          <div className="flex pl-3">
            {[
              "⏰", "🌦️", "🌏", "💱",
            ].map((img) => <Circle className="w-12 h-12 text-[20px]" key={img} style={{ marginLeft: -12 }}>{img}</Circle>)}
            <img style={{ marginLeft: -12 }} src={More} />
          </div>
        </div>
        <div className="absolute w-[120%] top-[26%] left-[-14%] scale-[.6] -rotate-12">
          <ProductCard
            isSubscribed={true}
            isAdded={true}
            data={{
              icon: "⏰",
              name: "Time",
              description: "Time 是一个提供时间和时区转换功能的 MCP 服务，使 LLM 能够获取当前时间信息并使用 IANA 时区名称执行时区转换，自动检测系统时区。"
            }}
          />
        </div>
        <div className="absolute w-[120%] top-[46%] left-[6%] scale-[.6] rotate-12">
          <ProductCard
            isSubscribed={true}
            isAdded={false}
            data={{
              icon: "💱",
              name: "Exchange Rate Query",
              description: "支持查询中国十大银行的外汇牌价，以及汇率查询"
            }}
          />
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

function ProductCard(props: {
  isSubscribed: boolean;
  isAdded: boolean;
  data: {
    name: string;
    description: string;
    icon: string;
  }
}) {
  const { data, isAdded, isSubscribed } = props;
  return (
    <div
      className="
        bg-white/60 backdrop-blur-sm rounded-2xl p-5
        border border-[#e5e5e5]
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:bg-white hover:shadow-md hover:scale-[1.02] hover:border-colorPrimary/30
        active:scale-[0.98]
        relative overflow-hidden group
        h-[200px] flex flex-col gap-4
      "
    >
      {/* 上部：Logo、名称和状态 */}
      <div className="flex gap-3 items-start">
        <div className="w-14 h-14 text-[40px]">
          {data.icon}
        </div>
        <div className="flex w-full h-full justify-between">
          <div className="flex h-full flex-col justify-between">
            <h3 className="font-medium text-base  truncate">{data.name}</h3>
            <div>
              <span className={`text-xs px-2 py-1 rounded-lg ${isSubscribed
                ? 'bg-colorPrimaryBgHover text-colorPrimary'
                : 'bg-gray-100 text-gray-600'
                }`}>
                {isSubscribed ? '已订阅' : '未订阅'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 中部：描述 */}
      <div className="flex-1 overflow-hidden">
        <p className="text-sm text-colorTextSecondaryCustom line-clamp-2">
          {data.description || '暂无描述'}
        </p>
      </div>

      {/* 下部：按钮区域 */}
      <div className="flex gap-2">
        {isSubscribed ? (
          <Button
            type={isAdded ? "default" : "primary"}
            block
          >
            {isAdded ? '取消添加' : '添加'}
          </Button>
        ) : (
          <div className="flex gap-2 justify-between w-full">
            <Button
              className="flex-1"
            >
              快速订阅
            </Button>
          </div>
        )}
      </div>
    </div >
  )
}

export default HomeMCPCard