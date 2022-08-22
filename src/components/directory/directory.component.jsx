import CategoryItem from '..//category-item/category-item.component';
import './directory.styles.scss';
const Directory = ({categories}) => {
    return (
        <div className="directory-container">
        {categories.map((categroy) => (
        <CategoryItem key={categroy.id} category={categroy} />   
        ))}
    </div>
    )
}

export default Directory;