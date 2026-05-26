"use client"
import React from 'react';

const Signup: React.FC = () => {
  return (
    <div className="page-background">
      {/* 바깥쪽 검은색 큰 테두리 박스 */}
      <div className="outer-display-box">
        
        {/* 중앙 회원가입 카드 */}
        <div className="signup-card">
          
          {/* 프로필 사진 표시 영역 (프사) */}
          <div className="profile-wrapper">
            <div className="profile-circle">
              <span className="camera-icon">📷</span>
            </div>
            <span className="profile-label">프사</span>
          </div>

          {/* 파란색 테두리 입력 폼 박스 */}
          <div className="inner-form-box">
            
            <div className="input-field">
              <label>Name</label>
              <input type="text" />
            </div>

            {/* ID 입력창과 중복확인 버튼 영역 */}
            <div className="input-field">
              <label>ID</label>
              <div className="id-row">
                <input type="text" />
                <button type="button" className="duplicate-check-btn">중복확인</button>
              </div>
            </div>

            <div className="input-field">
              <label>PW</label>
              <input type="password" />
            </div>

            {/* 오른쪽 아래 Signup 텍스트/버튼 */}
            <div className="signup-text-wrapper">
              <span className="signup-text">signup</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;