exports.escapeRegex = (query) => {
    let search_query = query || "";
	search_query = new RegExp(search_query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi');
	return search_query;
}