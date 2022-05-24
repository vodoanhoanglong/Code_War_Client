import { useMutation } from '@apollo/client';
import Button from 'components/Button';
import { INSERT_CONTEST } from 'graphql/Mutation';
import { GET_CONTEST } from 'graphql/Queries';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const CreateContest = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [inputName, setInputName] = useState('');
  const [inputDes, setInputDes] = useState('');
  const navigate = useNavigate();

  const [saveContests] = useMutation(INSERT_CONTEST);

  let hms = moment(time).format('HH:mm:ss');
  let a = hms.split(':');

  let seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

  const handleListAdd = () => {
    if (!inputName || !inputDes) {
      return alert('Vui lòng nhập đầy đủ thông tin');
    } else {
      saveContests({
        variables: {
          name: inputName,
          des: inputDes,
          startDate: moment(startDate).format('YYYY-MM-DDTHH:mm:ssZ'),
          endDate: moment(endDate).format('YYYY-MM-DDTHH:mm:ssZ'),
          status: 'active',
          time: seconds * 1000,
        },
        // onCompleted: () => {
        //   alert('Thêm thành công');
        // },
        onError: (error) => {
          alert('Tiêu đề đã tồn tại');
          console.log(error.message);
        },
        refetchQueries: [GET_CONTEST],
      });
    }
    return navigate(`/admin/contest/`);
  };

  return (
    <>
      <div className="create_container">
        <div className="create_description">
          <h1>Tạo cuộc thi</h1>
          <ul>
            <div className="create_card">
              <li>
                <h3>Tiêu đề</h3>
                <div className="create_card--input">
                  <input
                    autoComplete="off"
                    spellCheck="false"
                    type="text"
                    placeholder="Tiêu đề"
                    onChange={(e) => setInputName(e.target.value)}
                  ></input>
                </div>
              </li>
              <li>
                <h3>Nội dung</h3>
                <div className="create_card--input">
                  <textarea
                    autoComplete="off"
                    spellCheck="false"
                    placeholder="Nội dung"
                    onChange={(e) => setInputDes(e.target.value)}
                  ></textarea>
                </div>
              </li>
              <div className="datetime">
                <li>
                  <h3>Thời gian làm bài</h3>
                  <div className="create_card--input">
                    <DatePicker
                      selected={time}
                      onChange={(date) => setTime(date)}
                      showTimeSelectOnly
                      timeInputLabel="Time:"
                      dateFormat="HH:mm:ss"
                      showTimeInput
                    />
                  </div>
                </li>
                <li>
                  <h3>Ngày giờ bắt đầu</h3>
                  <div className="create_card--input">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      showTimeInput
                      minDate={new Date()}
                    />
                  </div>
                </li>
                <li>
                  <h3>Ngày giờ kết thúc</h3>
                  <div className="create_card--input">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      showTimeInput
                      minDate={startDate}
                    />
                  </div>
                </li>
              </div>
              <li>
                <div className="create_card--button">
                  <Button onClick={() => handleListAdd()}>Lưu</Button>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CreateContest;
