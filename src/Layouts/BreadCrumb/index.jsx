import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { useEffect, useState } from "react";
import { getCountDealsService } from "../../Services/Deal";

function MyBreadcrumb({ categories, categorySlug }) {
  const [breads, setBreads] = useState([]);
  const [dspDeal, setDspDeal] = useState("");
  const themeColor = 'blue.500';

  // const getCategoryBreadcrumb = (category, breadcrumb = []) => {
  //   if (category.parent_id > 0) {
  //     breadcrumb.push(category);
  //     return getCategoryBreadcrumb(categories.filter((item) => item.id === category.parent_id), breadcrumb);
  //   }
  //   return breadcrumb.reverse();
  // };

  // const breadcrumb = getCategoryBreadcrumb(categories.filter((item) => item.slug == categorySlug));
  useEffect(() => {
    setBreadCrumb();
  }, [categories, categorySlug])

  const setBreadCrumb = async () => {
    if ( categories && categories.length && categorySlug) {
      var curId = categories.find(v => (v.slug == categorySlug));
      curId = curId.id;
      var tId = curId;
      var tBreads = [];
      while (tId != -1) {
        tBreads.unshift(getCategoryById(tId));
        tId = getCategoryById(tId).parent_id;
      }
      setBreads(tBreads)

      var allChildren = getAllChildren(curId) ;
      var countDeal = await getCountDealsService(allChildren) ;
      setDspDeal(` (${countDeal} deal${countDeal>1?"s":""})`);
      return curId;
    } else {
      setBreads([])
      return -1;
    }
  }

  function getAllChildren(id) {
    var res = [];
    var que = [id];
    while (que.length > 0) {
      var cur = que.shift();
      var isParent = false;
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].parent_id == cur) {
          que.push(categories[i].id);
          isParent = true;
        }
      }
      if (!isParent)
        res.push(cur);
    }
    return res;
  }

  const getCategoryById = (id) => {
    return categories.find(v => (v.id == id))
  }

  return (
    <>
      <Breadcrumb
        separator=">"
        p={5}
        fontSize={'0.9em'}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/" color={themeColor}><Icon as={MdHome} boxSize={6} mt={1} /></BreadcrumbLink>
        </BreadcrumbItem>
        {
          breads.map((v,idx) => (
            <BreadcrumbItem key={idx}>
              <BreadcrumbLink key={idx} href="#" >{v.name} {idx==breads.length-1? dspDeal:""}</BreadcrumbLink>
            </BreadcrumbItem>
          ))
        }
      </Breadcrumb>
    </>
  );
}

export default MyBreadcrumb;

//{v.slug==categorySlug?isCurrentPage:""}