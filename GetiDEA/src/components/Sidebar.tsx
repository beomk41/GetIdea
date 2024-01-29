import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="h-fit min-h-screen w-80 bg-side scrollbar  scrollbar-thumb-red ">

      {/* 로고 이미지*/}
      <div className=" mt-10 p-4 flex justify-center items-center">
       <img src="/logo4.png" alt="" className="object-cover h-24 w-24"/>
      </div>

      {/* 로고 이름 */}
      <div className="text-2xl text-center mb-5 font-extrabold p-4 font-poppins">
        Good Eye Deer
      </div>

      {/* 프로젝트 검색 바 */}
     
      {/* <div className="text-xl mb-8 font-bold p-4 text-left flex justify-center items-center ">
        <input type="search" name="search" placeholder="프로젝트 검색" className="bg-white p-4 rounded-xl drop-shadow-md text-base font-poppins font-normal focus:outline-none"  />
          <button type="submit" className="absolute left-600 top-0">
          </button>
      </div> */}

      {/* 네비게이션 메뉴 */}
      <ul>
        {/* 홈 버튼 */}
        <li className="flex justify-center mb-3">
          <a className="flex flex-row text-center  block  rounded py-4 px-4 bg-white hover:bg-white text-black" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5 stroke-blue opacity-80">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className='font-IBM font-semibold mr-32 text-blue opacity-80'>홈</span>
          </a>
        </li>

        {/* 최근 작업 버튼 */}
        <li className="flex justify-center mb-3">
          <a className="flex flex-row text-center  block  rounded py-4 px-4 bg-blue-500 hover:bg-white  hover:text-blue hover:opacity-80 text-black" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>

            <span className='font-IBM font-semibold mr-20'>최근작업</span>
          </a>
        </li>

        {/* 북마크 버튼 */}
        <li className="flex justify-center mb-3">
          <a className="flex flex-row text-center  block  rounded py-4 px-4 bg-blue-500 hover:bg-white hover:text-blue hover:opacity-80 text-black" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
            <span className='font-IBM font-semibold mr-24'>북마크</span>
          </a>
        </li>

        {/* 구분선 */}
        <hr className="w-56 mx-auto h-px my-8 bg-line_gray border-0 dark:bg-gray-700"></hr>

        {/* 모든 프로젝트 */}
        <div className="py-2 flex  justify-center ">
			    <details className="group">

				  <summary className="w-56 justify-center rounded py-4 px-4 hover:bg-white hover:text-blue hover:opacity-80 flex  text-center  items-center font-medium cursor-pointer list-none">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>

            <span className='font-IBM font-semibold'>모든 프로젝트</span>
					  <span className="ml-5  transition group-open:rotate-180">
              <svg className='stroke-line_gray' fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
            </span>
				  </summary>

				  <ul className='p-4'>
              
              <li className="flex justify-center mb-3  ">
                <a className="w-56 flex flex-row text-center  block  rounded py-4 px-4 text-black hover:bg-white hover:text-blue hover:opacity-80 " href="#">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>

                  <span className='font-IBM font-semibold'>선보고 후조치</span>
                </a>
              </li>

                
                <li className="flex justify-center mb-3 ">
                  <a className="w-56 flex flex-row text-center  block  rounded py-4 px-4 bg-blue-500 hover:bg-white hover:text-blue hover:opacity-80 text-black" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                  </svg>
                    <span className='font-IBM font-semibold'>B104</span>
                  </a>
                </li>

                {/* 새로운 폴더 만들기 */}
                <li className="flex justify-center mb-3 ">
                  <div className="hover:bg-white w-56 flex flex-row text-center  block  rounded py-4 px-4  text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}  className="w-6 h-6 mr-5 stroke-light_gray">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                  </svg>

                    <span className='text-light_gray font-IBM font-semibold'>새로운 폴더 만들기</span>
                  </div>
                </li>
              </ul>
            </details>
          </div>
        </ul>
      </div>
  );
};

export default Sidebar;