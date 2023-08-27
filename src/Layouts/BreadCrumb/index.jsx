import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";

function MyBreadcrumb(categories, categorySlug) {
  const themeColor = '#007ea6';

  // const getCategoryBreadcrumb = (category, breadcrumb = []) => {
  //   if (category.parent_id > 0) {
  //     breadcrumb.push(category);
  //     return getCategoryBreadcrumb(categories.filter((item) => item.id == category.parent_id), breadcrumb);
  //   }
  //   return breadcrumb.reverse();
  // };

  // const breadcrumb = getCategoryBreadcrumb(categories.filter((item) => item.slug == categorySlug));

  return (
    <Breadcrumb
      separator=">"
      p={5}
      fontSize={'0.9em'}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/" color={themeColor}><Icon as={MdHome} boxSize={6} mt={1} /></BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Category</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">Current</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default MyBreadcrumb;