# Issues #
Listing of current outstanding issues.

 * Swagger generated API models are camelCase. These models are actually
   PascalCase on the wire and this causes many issues. Primarily that the
   TypeScript compiler complains about these fields not being found when
   referenced. Currently forcing the use of any.
 * Swagger generated API methods are named in such a way as to beg for breaking
   name changes. May make sense to in a facade to isolate issues and give it a
   nicer client-facing usage.
 * DELETE /api/repos/{name}/packages is not using content-type application/json
   in its headers.
 * Need to find an approach to extending the generated API and models to fill in
   commonly needed functionality. This is currently causing severe controller
   bloat.
 * Need a more substantial file upload module. May play in to a more general
   queue for monitoring background operations.
 * The atom TypeScript plugin is not finding the angular.ui declarations despite
   them being found in ./node_modules/@types
 * Lots of HTML copy-paste. Probably can be addressed by consolidating repeated
   structures with components/directives.
 * Lots of $mdDialog copy-paste. Again: components/directives. This is further
   complicated by the use of promises with these dialogs.
 * Dealing with resolves is more awkward than it should be.
