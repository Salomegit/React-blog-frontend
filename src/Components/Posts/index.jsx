import Post from "../Post"
import "./posts.css"

export default function Posts({posts}) {
  return (
    <div className="posts">
      {posts.map((p)=>(

<Post post={p} key={p._id}/>
      ))}
        
        </div>
  );
}
