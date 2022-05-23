import { useMutation, useQuery } from '@apollo/client';
import Button from 'components/Button';
import PageLoading from 'components/PageLoading';
import { UPDATE_PROBLEM } from 'graphql/Mutation';
import { GET_ALL_EXERCISE } from 'graphql/Queries';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ListCourse = () => {
  let { loading, error, data } = useQuery(GET_ALL_EXERCISE);

  if (loading) return <PageLoading />;
  if (error) return <div>Load data failed</div>;
  return (
    <div className="table">
      <div className="container">
        <div className="table_head">
          <div className="table_head_title">
            <span>Danh sách khóa học</span>
          </div>
        </div>

        <div className="table_body">
          <div className="table_body_heading">
            <table>
              <colgroup>
                <col width="50" />
                <col width="120" />
                <col width="300" />
                <col width="400" />
                <col width="100" />
              </colgroup>
              <thead>
                <tr>
                  <th className="table_body_heading_item">
                    <div className="table_cell">
                      <span> </span>
                    </div>
                  </th>
                  <th className="table_body_heading_item">
                    <div className="table_cell">
                      <span>ID</span>
                    </div>
                  </th>
                  <th className="table_body_heading_item">
                    <div className="table_cell">
                      <span>Tiêu đề</span>
                    </div>
                  </th>

                  <th className="table_body_heading_item">
                    <div className="table_cell">
                      <span>Cập nhật lúc</span>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="table_body_content">
            <table>
              <colgroup>
                <col width="50" />
                <col width="120" />
                <col width="300" />
                <col width="400" />
                <col width="180" />
              </colgroup>
              <tbody>
                {data?.exercises.map((item, index) => (
                  <TableRow key={index} data={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ data }) => {
  const { id, name, des, level, topic, updatedAt } = data;
  const displayID = id.substr(0, 8).toUpperCase();

  const [removeProblem] = useMutation(UPDATE_PROBLEM);
  const handleListRemove = () => {
    removeProblem({
      variables: { exerciseId: id, des, name, topic, level, updatedAt, status: 'deleted' },
      onCompleted: () => {
        alert('Xóa thành công');
      },
      onError: (error) => {
        alert(error.message);
      },
      refetchQueries: [GET_ALL_EXERCISE],
    });
  };
  return (
    <tr className="table_row">
      <td className="table_body_content_item"></td>
      <td className="table_body_content_item">
        <div className="table_cell">{displayID}</div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell">{name}</div>
      </td>

      <td className="table_body_content_item">
        <div className="table_cell">
          <span>{moment(updatedAt).format('DD/MM/YYYY - HH:MM:ss')}</span>
        </div>
      </td>
      <td className="table_body_content_item">
        <div className="table_cell actions">
          <Link to="/admin/problems/update" state={{ exerciseData: data }}>
            <Button backgroundColor="blue">
              <i className="bx bxs-edit"></i>
              <span>Sửa</span>
            </Button>
          </Link>

          <Button backgroundColor="red" onClick={() => handleListRemove(id)}>
            <i className="bx bxs-trash"></i>
            <span>Xóa</span>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ListCourse;
