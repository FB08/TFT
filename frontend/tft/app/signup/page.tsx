"use client"
import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { Toaster } from 'sonner';


const Signup = () => {
  const [name, setName] = useState('');
  const [userId, setId] = useState('');
  const [password, setPassword] = useState('');
  const signupMutation = useSignup();
  const handleSignup = () => {
    signupMutation.mutate({ name, userId, password });
  }
  return (
    <div className="page-background">
      {/* 바깥쪽 검은색 큰 테두리 박스 */}
      <div className="outer-display-box">
        
        {/* 중앙 회원가입 카드 */}
        <div className="signup-card">
          
          {/* 프로필 사진 표시 영역 (프사) */}
          <div className="profile-wrapper">
            <div className="profile-circle">
              <span className="profile-icon">👤</span>
            </div>
          </div>

          {/* 파란색 테두리 입력 폼 박스 */}
          <div className="inner-form-box">
            
            <div className="input-field">
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            {/* ID 입력창과 중복확인 버튼 영역 */}
            <div className="input-field">
              <label>ID
                <button type="button" className="duplicate-check-btn">중복확인</button>
              </label>
              <div className="id-row">
                <input type="text" value={userId} onChange={(e) => setId(e.target.value)} />
              </div>
            </div>
            <div className="input-field">
              <label>PW</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {/* 오른쪽 아래 Signup 텍스트/버튼 */}
            <div className="signup-text-wrapper">
              <button type="button" className="signup-text" onClick={handleSignup} disabled={signupMutation.isPending}>
                {signupMutation.isSuccess ? '가입 완료' : '회원 가입'}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;