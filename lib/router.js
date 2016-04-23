var requireLogin = function (){
    if(!Meteor.user()){
        if(Meteor.loggingIn()){
            return this.render(this.loadingTemplate);
        }
        return this.render('accessDenied');
    }
    this.next();
};

Router.configure({
    layoutTemplate : 'layout',
    loadingTemplate : 'loading',
    notFoundTemplate: 'notFound',
    waitOn : function (){
        return Meteor.subscribe('posts');
    }
});

Router.route('/', {name: 'postsList'});

Router.route('/posts/:_id',
    {
        name : 'postPage',
        data : function (){
            return Posts.findOne(this.params._id);
        }
    }
);

Router.route( '/submit', { name : 'postSubmit' } );

Router.onBeforeAction( 'dataNotFound', { only: 'postPage'   } );
Router.onBeforeAction( requireLogin,   { only: 'postSubmit' } );