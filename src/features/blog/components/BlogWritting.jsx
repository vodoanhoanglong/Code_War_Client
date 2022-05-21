import Button from 'components/Button';
import MDEditor from 'components/MarkDownEdior/MDEditor';
import { useAuth } from 'hooks/useAuth';
import React from 'react';

const BlogWritting = ({ blogid, blogcontent, blogtitle, mutationHandle }) => {
  const { user } = useAuth();
  const [content, setContent] = React.useState(blogcontent || '');
  const [title, setTitle] = React.useState(blogtitle || '');

  const onImageUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (data) => {
        resolve(data.target.result);
      };
      reader.readAsDataURL(file);
    });
  };
  const onHandleSubmit = () => {
    const blog = { blogID: blogid, blogTitle: title, blogContent: content, authorID: user.id };
    if (window.confirm('Bạn đã chắc chắn sẽ tải lên bài viết này?')) {
      mutationHandle({ variables: { ...blog } });
    }
  };
  return (
    <section className="blog post">
      <div className="title">
        <input
          type="text"
          placeholder="Tiêu đề bài viết...."
          className="input_control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button size="lg" isDisabled={!user} onClick={() => onHandleSubmit()}>
          <i className="bx bx-upload"></i>
          Tải lên
        </Button>
      </div>
      <MDEditor style={{ height: '780px' }} value={content} onChange={setContent} onImageUpload={onImageUpload} />
    </section>
  );
};

export default BlogWritting;
