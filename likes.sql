Select id, A.count_like, B.count_dislike,
	CASE
        WHEN ISNULL(B.count_dislike) THEN A.count_like
        WHEN ISNULL(A.count_like) THEN -1 * B.count_dislike
        ELSE A.count_like - B.count_dislike
    END AS cnt
FROM deal
LEFT JOIN
(select dest_id, count(*) as count_like
From likes
where type="deal" AND is_like=1
GROUP BY dest_id) A 
ON deal.id = A.dest_id
LEFT JOIN
(select dest_id, count(*) as count_dislike
From likes
where type="deal" AND is_like=0
GROUP BY dest_id) B 
ON deal.id = B.dest_id;