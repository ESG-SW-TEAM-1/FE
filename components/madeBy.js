import React from "react";
import Image from "next/image";

const MadeBy = () => {
  return (
    <div className="container">
      <p className="text-white text-3xl font-nanum-bold mb-16">만든이들</p>
      <ul className="flex justify-evenly items-center gap-4 list-none">
        <li className="text-center">
          <Image
            src="/1.png"
            alt="신예슬"
            width={400}
            height={400}
            className="rounded-xl"
          />
          <span className="text-white block my-4">신예슬</span>
          <span className="text-textActive text-xs">
            수고한 그대들에게 박수를 짝짝짝 <br />
            끝난 줄 알았죠? 이제 시작이에요~! <br />
            <span className="text-textInactive block italic text-xs mt-4">
              #ISTJ #멱살잡고 #끌고가는 #리더
            </span>
          </span>
        </li>
        <li className="text-center">
          <Image
            src="/2.png"
            alt="최성원"
            width={400}
            height={400}
            className="rounded-xl"
          />
          <span className="text-white block my-4">최성원</span>
          <span className="text-textActive text-xs">
            벌려놓은 일들에 끌려다니는 <br />
            똑부러지고 싶은 갓생 호소인 <br />
            <span className="text-textInactive block italic text-xs mt-4">
              #eNtP #이러다내가 #똑 #부러지겠어
            </span>
          </span>
        </li>
        <li className="text-center">
          <Image
            src="/3.png"
            alt="신민규"
            width={400}
            height={400}
            className="rounded-xl"
          />
          <span className="text-white block my-4">신민규</span>
          <span className="text-textActive text-xs">
            GPT에 점령 당한 사람 <br />
            <br />
            <span className="text-textInactive block italic text-xs mt-4">
              #iNtP #GPT없인 #못살게돼버린 #몸
            </span>
          </span>
        </li>
        <li className="text-center">
          <Image
            src="/4.png"
            alt="김채린"
            width={400}
            height={400}
            className="rounded-xl"
          />
          <span className="text-white block my-4">김채린</span>
          <span className="text-textActive text-xs">
            GPT야 그동안 멍청하다고 놀려서 미안해 <br />
            개발할 때 모르는 거 알려줘서 고마워 . . <br />
          </span>
          <span className="text-textInactive block italic text-xs mt-4">
            #eNTP #에러뜨면 #눈물나는 #막내
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MadeBy;
