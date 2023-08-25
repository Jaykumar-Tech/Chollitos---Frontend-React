import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

function  MyBreadcrumb() {
  return (
    <Breadcrumb 
    separator=">" 
    p={5}
    fontSize={'0.9em'}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
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