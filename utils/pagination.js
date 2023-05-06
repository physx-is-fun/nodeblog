exports.pagination = async (modelQuery,query,perPage,totalCount) => {
	try {
		let result = {};
		result.currentPage = parseInt(query.page) || 1;
		result.list = await modelQuery.limit(perPage).skip(( result.currentPage - 1 ) * perPage).exec();
		result.pageNumber = Math.ceil(totalCount/perPage);
		return result;
	} catch(error){
		return error;
	}	
};