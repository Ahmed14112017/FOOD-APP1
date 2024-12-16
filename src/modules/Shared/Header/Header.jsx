import React from 'react'

export default function Header({title,imgurl,person,descreption}) {
  return (
    <div className='container-fluid header-container bg-success rounded-4 p-3'>
         <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 1205 307"
  >
    <path
      stroke="#54B435"
      strokeOpacity="0.5"
      strokeWidth="12"
      d="M580 249c0 16.491-13.577 30-30.5 30S519 265.491 519 249s13.577-30 30.5-30 30.5 13.509 30.5 30ZM719 131.5c0 8.431-7.033 15.5-16 15.5s-16-7.069-16-15.5 7.033-15.5 16-15.5 16 7.069 16 15.5Z"
    ></path>
    <circle
      cx="871.5"
      cy="29.5"
      r="15.5"
      stroke="#54B435"
      strokeOpacity="0.5"
      strokeWidth="12"
    ></circle>
    <circle
      cx="76"
      cy="231"
      r="64"
      stroke="#fff"
      strokeOpacity="0.05"
      strokeWidth="24"
    ></circle>
    <path
      stroke="#54B435"
      strokeOpacity="0.5"
      strokeWidth="12"
      d="M112 68.5C112 81.384 101.35 92 88 92S64 81.384 64 68.5 74.65 45 88 45s24 10.616 24 23.5Z"
    ></path>
    <path
      stroke="#fff"
      strokeOpacity="0.05"
      strokeWidth="25"
      d="M594.5 73.5c0 33.77-27.167 61-60.5 61s-60.5-27.23-60.5-61 27.167-61 60.5-61 60.5 27.23 60.5 61ZM1232.5 173c0 54.9-44.72 99.5-100 99.5s-100-44.6-100-99.5 44.72-99.5 100-99.5 100 44.6 100 99.5Z"
    ></path>
  </svg>
      <div className="row justify-content-between align-items-center ">
        <div className="col-md-6 col-12">
            <div className="content text-white">
            <span className='fw-bold fs-3 pe-2 '>{title}</span>
            <span className='fs-3 text-white'>{person}</span>
            
            <p className='fs-5'>{descreption}</p>
            </div>
            
        </div>
        <div className='col-md-6 col-12 text-end'>
            <div className="img">
            <img src={imgurl} alt='headerpage' className='w-30' />
            </div>
        </div>
      </div>
    </div>
  )
}
