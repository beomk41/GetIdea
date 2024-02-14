import React from 'react';
import { useState,useEffect,useRef,ChangeEvent, } from 'react';
import api from '../api';
import Swal from 'sweetalert2';


interface ProfileModalProps {
  isOpen: boolean;
  closeModal: () => void;
  profileImage : string;
  setProfileImage : React.Dispatch<React.SetStateAction<string>>;
}

interface User {
  userName: string;
  userEmail: string; // API 응답의 오타가 의도된 것이라면 여기도 같게 유지
  profileImage: string;
}

interface ProfileJson {
  profileImage: string;
}



type UserResponse = User[];

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, closeModal, profileImage, setProfileImage }) => {

    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [profile, setProfile] = useState<string>('');

    const showAlert = async() => {
     await Swal.fire({
          text: '프로필이 수정되었습니다.',
        icon: 'success',
        confirmButtonText: '확인'
      });
    };
  
    useEffect(() => {
        const fetchData = async () => {
        try {
          const response = await api.get<UserResponse>(`/api/user/search?userEmail=${localStorage.getItem('userEmail')}`);
          console.log(response.data[0]);
          setUserName(response.data[0].userName);
          setUserEmail(response.data[0].userEmail); 
          setProfile(response.data[0].profileImage); 
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
        };
        fetchData();
    }, [isOpen]);

    // 프로필 수정 POST 요청
    const updateUserProfile = async (userInfo: ProfileJson) => {
        try {
            console.log(userInfo);
            const response = await api.post('/api/image/userEmail/profileImage', userInfo,);
            console.log('Update success:', response.data);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    //유저 이름 변경 관련
    const nameChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const nameChangeSave = async () =>{ 
      try {
   
        const response = await api.patch(`/api/user/rename`, userName, {
          headers: {
              'Content-Type': 'text/plain' // JSON 형식의 데이터를 전송한다는 것을 명시
          }
        });
            console.log('서버 응답:', response.data);
            await showAlert();  
            localStorage.setItem('userName',userName);
            closeModal();
            window.location.reload();
         
        } catch (error) {
            console.error('업로드 실패:', error);
            alert('파일 업로드 실패.');
        }
        
    }

    // 프로필 이미지 변경 관련
    const selectFile = useRef<HTMLInputElement>(null);
    
    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          
          reader.onloadend = async () => {
            setProfile(reader.result as string);
            setProfileImage(reader.result as string);
          };
          reader.readAsDataURL(file);

          const formData = new FormData();
          console.log(file)
          formData.append('Image', file); // 프로필 이미지 파일
          try {
            console.log(formData)
            await api.post('/api/image/profile',formData);
            console.log("전송 완료")
            } catch (error) {
                alert('파일 업로드 실패.');
            }
          }
      };

      // 저장 버튼 클릭 시 유저 정보 변경
      const changeUserProfile =()=> {
        closeModal();
        
    }

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px'
      }}>
        <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
            <div className="relative container m-auto px-6">
                <div className="w-[500px] ">
                    <div className="rounded-xl h-[380px]  rotate-[-0.03deg] bg-white dark:bg-gray-800 shadow-xl">
                        <div className="px-8 py-4">
                            

                            <div className=" mt-3 flex flex-row gap-72 items-center justify-center ">
                                <h2 className="text-2xl mt-2 text-center font-Nanum  dark:text-white font-bold rotate-[-0.03deg]">내 프로필
                                </h2>
                                <svg  onClick={closeModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ml-6  text-light_gray cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="flex flex-row mt-5 h-60">
                                <div className='flex flex-col items-center  h-full w-[30%]'>
                                    <div className={profile?`rounded-full w-32 h-32 mt-3 ` :`rounded-full w-32 h-32 mt-3 bg-main`}>
                                        <img src={profile} alt="" className='rounded-full w-32 h-32 object-cover' />
                                    </div>
                                    <div className='mt-3 cursor-pointer text-sm font-Nanum font-regular text-opacity-80 text-black bg-white drop-shadow-md rounded-lg p-2 rotate-[-0.03deg]' onClick={() => {
                                        if (selectFile.current) {
                                            selectFile.current.click();
                                        }
                                        }}
                                        >
                                        <input  type = "file" accept = "image/*" 
                                            name="image"
                                            multiple
                                            hidden
                                            ref={selectFile}
                                            onChange={handleImageChange}
                                        />
                                        프로필 이미지 변경
                                    </div>
                                   
                                </div>
                                <div className='flex flex-col font-Inter ml-10 py-5 h-full w-[70%] rotate-[-0.03deg]'>
                                    <div className='mb-1'>이름</div>
                                    <input className='w-full h-12 rounded-md border-2 px-3 border-line_gray bg-white' type="text" value={userName} onChange={nameChange} spellCheck={false}/>
                                    <div className='mb-1  mt-4'>이메일</div>
                                    <input className='w-full h-12 rounded-md border-2 px-3 border-line_gray' type="text" value={userEmail} disabled/>
                                </div>
                            </div>
                            <div className='flex flex-row justify-end gap-2 h-10 font-Nanum'>
                                <button className='bg-white rounded-md border-[1.5px] text-opacity-80 text-black text-sm font-regular border-line_gray w-16 h-8' onClick={closeModal}>취소</button>       
                                <button className='bg-blue bg-opacity-80 rounded-md  text-opacity-80 text-white text-sm w-16 h-8' onClick={nameChangeSave}>저장</button>
                            </div>
                      
                    </div>
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
